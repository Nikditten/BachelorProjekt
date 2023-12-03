using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class VideoSessionAndEntityAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEvents_Sessions_SessionId",
                table: "VideoEvents");

            migrationBuilder.DropIndex(
                name: "IX_VideoEvents_SessionId",
                table: "VideoEvents");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "VideoEvents");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "VideoEvents");

            migrationBuilder.DropColumn(
                name: "VideoId",
                table: "VideoEvents");

            migrationBuilder.DropColumn(
                name: "WebsiteKey",
                table: "VideoEvents");

            migrationBuilder.AddColumn<string>(
                name: "LandingPage",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "VideoSessions",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    VideoSessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    SessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    VideoId = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Source = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoSessions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_VideoSessions_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VideoEvents_VideoSessionId",
                table: "VideoEvents",
                column: "VideoSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoSessions_SessionId",
                table: "VideoSessions",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoEvents_VideoSessions_VideoSessionId",
                table: "VideoEvents",
                column: "VideoSessionId",
                principalTable: "VideoSessions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEvents_VideoSessions_VideoSessionId",
                table: "VideoEvents");

            migrationBuilder.DropTable(
                name: "VideoSessions");

            migrationBuilder.DropIndex(
                name: "IX_VideoEvents_VideoSessionId",
                table: "VideoEvents");

            migrationBuilder.DropColumn(
                name: "LandingPage",
                table: "Sessions");

            migrationBuilder.AddColumn<Guid>(
                name: "SessionId",
                table: "VideoEvents",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "VideoEvents",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VideoId",
                table: "VideoEvents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WebsiteKey",
                table: "VideoEvents",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_VideoEvents_SessionId",
                table: "VideoEvents",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoEvents_Sessions_SessionId",
                table: "VideoEvents",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
