# Assumptions & Tradeoffs

## Architecture

**Monorepo structure.** The backend and frontend live in one repository instead of two, with `backend/` and `frontend/` as separate folders. Given the scope of this project, one repo keeps everything in one place while still keeping the code itself well separated.

**Three separate repository/service pairs on the backend** (User, Department, Project), instead of one shared generic pair. Each report type has a different shape and different relationships to resolve, so keeping them separate is clearer than forcing them into one generic structure.

**One shared, reusable `ReportTable` component on the frontend.** The actual table rendering logic is identical across all three report types, only the columns differ, so one component that takes column configuration as input works well here.

## Data Modeling

**Foreign keys are modeled explicitly.** Department's Manager and Project's Owner/Department are references to Users and Departments. The backend stores only the raw ID (`managerId`, `ownerId`, `departmentId`) and resolves it to a display name in the service layer, the same layer that would change if a real database replaced the in-memory data later.

**Enums are used for fixed value sets** (`UserRole`, `UserStatus`, `ProjectStatus`) instead of plain strings. This gives compile-time checking for a known, fixed list of values.

**`endDate` is nullable** on Projects, since in-progress projects don't have an end date yet. The UI shows "In Progress" instead of a blank value.

## API Design

**Slugs are used as report IDs** (`"users"`, `"departments"`, `"projects"`), not numbers. These match the endpoint paths directly, so the frontend can build the URL straight from the ID.

**Error handling covers the two realistic cases.** All 4 endpoints are read-only GETs against fixed data, with no user input to validate. The two cases that can actually happen are an unmapped route (404) and an unexpected bug (500), both returned in the same structured format (`status`, `message`, `timestamp`). Both were manually tested.

**Swagger/OpenAPI is included**, though not required, since it's a small addition and gives a way to test the API directly without reading the controller code.

## Frontend

**Material UI is used for styling** instead of custom CSS. Given the time available, this let the focus stay on the data and logic rather than building basic UI components like tables, cards, and inputs from scratch.

**Pagination is included on the report tables**, even though the current data is small (3-5 rows per report). This shows the tables would hold up if the data grew.

**Tables use horizontal scroll on narrow screens** instead of hiding columns or switching to a different mobile layout. This was checked in the browser at mobile width and works cleanly.

## Testing

Loading, empty, and error states were all tested directly:
- The error state was tested by stopping the backend and confirming the error message appears.
- The loading state was confirmed visible when running the app through Docker.
- The empty state was tested by temporarily removing all mock data from one report and confirming the "No data available" message appears, then restoring the data.

## Enhancements

**Search/filter on the landing page applies to the report list itself**, not to rows inside an opened report. Separate Status and Role filters were added inside the Users and Projects reports for filtering rows within those tables as dropdowns above each table, with a "Clear Filters" option that only appears when a filter is active. The filtering logic lives in each report's own component rather than in the shared table component, since the table component itself has no knowledge of what a status or role means for any given report.

**Back button was moved to the top-left as an icon**, replacing an earlier top-right text button. Top-left is the standard placement for back navigation across both mobile and desktop.

## Out of Scope

- Authentication or user accounts
- A real database (the spec allows in-memory data; foreign key relationships are still modeled properly so a real database could be added later without changing anything above the repository layer)