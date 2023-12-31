# SOURCE/TAKEN FROM: https://learn.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=linux&pivots=dotnet-7-0

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /backend

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /backend
COPY --from=build-env /backend/out .
ENTRYPOINT ["dotnet", "API.dll"]