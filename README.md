```mermaid
classDiagram
    class AdminApp {
        +void login()
        +void logout()
        +List<User> viewUsers()
        +void updateUser(User)
        +void deleteUser(User)
        +List<Driver> viewDrivers()
        +void updateDriver(Driver)
        +void deleteDriver(Driver)
        +List<Trip> viewTrips()
        +void updateTrip(Trip)
        +void deleteTrip(Trip)
        +List<SupportQuery> viewSupportQueries()
        +void resolveSupportQuery(SupportQuery)
        +List<DriverReport> viewDriverReports()
        +void resolveDriverReport(DriverReport)
        +void updateSystemSettings(SystemSettings)
    }
    
    class LoginService {
        +String username
        +String password
        +boolean login(String, String)
        +void logout()
    }
    
    class UserService {
        +List<User> getUsers()
        +void updateUser(User)
        +void deleteUser(User)
    }
    
    class DriverService {
        +List<Driver> getDrivers()
        +void updateDriver(Driver)
        +void deleteDriver(Driver)
    }
    
    class TripService {
        +List<Trip> getTrips()
        +void updateTrip(Trip)
        +void deleteTrip(Trip)
    }
    
    class SupportService {
        +List<SupportQuery> getSupportQueries()
        +void resolveQuery(SupportQuery)
    }
    
    class DriverReportService {
        +List<DriverReport> getDriverReports()
        +void resolveReport(DriverReport)
    }
    
    class SettingsService {
        +SystemSettings settings
        +void updateSettings(SystemSettings)
    }
    
    class User {
        -String id
        -String name
        -String email
        -UserRole role
    }
    
    class Driver {
        -String id
        -String name
        -String email
        -String licenseNumber
        -List<Trip> trips
    }
    
    class Trip {
        -String id
        -String driverId
        -String customerId
        -String destination
        -DateTime date
        -TripStatus status
    }
    
    class SupportQuery {
        -String id
        -String queryText
        -String userId
        -QueryStatus status
    }
    
    class DriverReport {
        -String id
        -String driverId
        -String reportDetails
        -ReportStatus status
    }
    
    class SystemSettings {
        -boolean allowNewTrips
        -boolean maintenanceMode
    }
    
    class UserRole{
        <<enumeration>>
        Admin, Driver, Customer, Member
    }
    
    class TripStatus{
        <<enumeration>>
        Planned, Ongoing, Completed, Cancelled
    }
    
    class QueryStatus{
        <<enumeration>>
        Open, InProgress, Resolved, Closed
    }
    
    class ReportStatus{
        <<enumeration>>
        Open, Investigating, Resolved, Closed
    }
    
    AdminApp --> LoginService : Uses
    AdminApp --> UserService : Uses
    AdminApp --> DriverService : Uses
    AdminApp --> TripService : Uses
    AdminApp --> SupportService : Uses
    AdminApp --> DriverReportService : Uses
    AdminApp --> SettingsService : Uses
