#!/usr/bin/env python3
"""
Google Sheets MCP Server
간단한 구글 시트 연동 MCP 서버
"""

import asyncio
import json
import os
from typing import Any, Dict, List
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    Tool,
    TextContent,
)
import google.auth
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Google Sheets API 설정
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

class GoogleSheetsMCPServer:
    def __init__(self):
        self.server = Server("google-sheets-mcp")
        self.sheets_service = None
        self.setup_handlers()
        
    def setup_handlers(self):
        @self.server.list_tools()
        async def list_tools() -> ListToolsResult:
            return ListToolsResult(
                tools=[
                    Tool(
                        name="read_sheet",
                        description="구글 시트에서 데이터를 읽어옵니다",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "spreadsheet_id": {
                                    "type": "string",
                                    "description": "스프레드시트 ID"
                                },
                                "range": {
                                    "type": "string", 
                                    "description": "읽을 범위 (예: A1:Z100)",
                                    "default": "A1:Z100"
                                }
                            },
                            "required": ["spreadsheet_id"]
                        }
                    ),
                    Tool(
                        name="write_sheet",
                        description="구글 시트에 데이터를 씁니다",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "spreadsheet_id": {
                                    "type": "string",
                                    "description": "스프레드시트 ID"
                                },
                                "range": {
                                    "type": "string",
                                    "description": "쓸 범위 (예: A1:Z100)"
                                },
                                "values": {
                                    "type": "array",
                                    "description": "쓸 데이터 (2차원 배열)"
                                }
                            },
                            "required": ["spreadsheet_id", "range", "values"]
                        }
                    )
                ]
            )
            
        @self.server.call_tool()
        async def call_tool(name: str, arguments: Dict[str, Any]) -> CallToolResult:
            if name == "read_sheet":
                return await self.read_sheet(arguments)
            elif name == "write_sheet":
                return await self.write_sheet(arguments)
            else:
                raise ValueError(f"Unknown tool: {name}")
    
    async def authenticate(self):
        """Google Sheets API 인증"""
        try:
            # 환경 변수에서 서비스 계정 파일 경로 가져오기
            service_account_path = os.getenv('SERVICE_ACCOUNT_PATH')
            if not service_account_path:
                raise ValueError("SERVICE_ACCOUNT_PATH 환경 변수가 설정되지 않았습니다")
            
            # 서비스 계정 인증
            credentials = Credentials.from_service_account_file(
                service_account_path, scopes=SCOPES
            )
            
            # Google Sheets API 서비스 빌드
            self.sheets_service = build('sheets', 'v4', credentials=credentials)
            return True
            
        except Exception as e:
            print(f"인증 실패: {e}")
            return False
    
    async def read_sheet(self, arguments: Dict[str, Any]) -> CallToolResult:
        """구글 시트에서 데이터 읽기"""
        try:
            if not self.sheets_service:
                if not await self.authenticate():
                    return CallToolResult(
                        content=[TextContent(
                            type="text",
                            text="인증에 실패했습니다"
                        )]
                    )
            
            spreadsheet_id = arguments.get("spreadsheet_id")
            range_name = arguments.get("range", "A1:Z100")
            
            # 시트에서 데이터 읽기
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=spreadsheet_id,
                range=range_name
            ).execute()
            
            values = result.get('values', [])
            
            return CallToolResult(
                content=[TextContent(
                    type="text",
                    text=f"데이터를 성공적으로 읽었습니다:\n{json.dumps(values, ensure_ascii=False, indent=2)}"
                )]
            )
            
        except Exception as e:
            return CallToolResult(
                content=[TextContent(
                    type="text",
                    text=f"데이터 읽기 실패: {str(e)}"
                )]
            )
    
    async def write_sheet(self, arguments: Dict[str, Any]) -> CallToolResult:
        """구글 시트에 데이터 쓰기"""
        try:
            if not self.sheets_service:
                if not await self.authenticate():
                    return CallToolResult(
                        content=[TextContent(
                            type="text",
                            text="인증에 실패했습니다"
                        )]
                    )
            
            spreadsheet_id = arguments.get("spreadsheet_id")
            range_name = arguments.get("range")
            values = arguments.get("values")
            
            # 시트에 데이터 쓰기
            body = {
                'values': values
            }
            
            result = self.sheets_service.spreadsheets().values().update(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption='RAW',
                body=body
            ).execute()
            
            return CallToolResult(
                content=[TextContent(
                    type="text",
                    text=f"데이터를 성공적으로 썼습니다. 업데이트된 셀 수: {result.get('updatedCells', 0)}"
                )]
            )
            
        except Exception as e:
            return CallToolResult(
                content=[TextContent(
                    type="text",
                    text=f"데이터 쓰기 실패: {str(e)}"
                )]
            )
    
    async def run(self):
        """MCP 서버 실행"""
        async with stdio_server() as (read_stream, write_stream):
            await self.server.run(
                read_stream,
                write_stream,
                self.server.create_initialization_options()
            )

async def main():
    server = GoogleSheetsMCPServer()
    await server.run()

if __name__ == "__main__":
    asyncio.run(main())
