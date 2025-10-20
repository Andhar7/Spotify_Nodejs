#!/bin/bash

# Main test runner script
# This script runs all API tests for the Spotify Clone project

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source the helper functions
source "$SCRIPT_DIR/test-helpers.sh"

# Source all test modules
source "$SCRIPT_DIR/test-auth.sh"
source "$SCRIPT_DIR/test-songs.sh"
source "$SCRIPT_DIR/test-albums.sh"
source "$SCRIPT_DIR/test-admin.sh"
source "$SCRIPT_DIR/test-users-stats.sh"

# Print banner
print_banner() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║         SPOTIFY CLONE - API TESTING SUITE                 ║"
    echo "║                                                            ║"
    echo "║  Comprehensive tests for all backend endpoints            ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}\n"
}

# Check if server is running
check_server() {
    print_info "Checking if server is running at ${BASE_URL}..."

    if curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/songs" | grep -q "200\|401"; then
        print_success "Server is running!"
    else
        print_failure "Server is not running!" "Please start the server with: npm run dev"
        echo -e "\n${RED}Exiting...${NC}\n"
        exit 1
    fi
}

# Main function
main() {
    print_banner
    check_server

    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Starting comprehensive API tests...${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}\n"

    # Run all test suites
    test_auth
    test_songs
    test_albums
    test_admin
    test_users_stats

    # Print final summary
    print_summary

    # Exit with appropriate code
    if [ $FAILED_TESTS -eq 0 ]; then
        exit 0
    else
        exit 1
    fi
}

# Handle script arguments
case "${1:-all}" in
    auth)
        print_banner
        check_server
        test_auth
        print_summary
        ;;
    songs)
        print_banner
        check_server
        test_songs
        print_summary
        ;;
    albums)
        print_banner
        check_server
        test_albums
        print_summary
        ;;
    admin)
        print_banner
        check_server
        test_admin
        print_summary
        ;;
    users)
        print_banner
        check_server
        test_users_stats
        print_summary
        ;;
    all|*)
        main
        ;;
esac
