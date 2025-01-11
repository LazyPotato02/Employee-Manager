# Employee Management

## Project Overview

This project is a web-based application built using Angular (version 18) that manages employees, material orders, and their associated data. The application includes functionality for viewing, editing, deleting, and managing cells, employees, and orders. It is intended for users to perform CRUD operations effectively.

---

## Key Features

1. **View Employees, Material Orders, and Cells**:

   - Display lists of employees, their respective cells, and material orders.
   - Dynamic and responsive UI.

2. **Add New Entries**:

   - Add new employees or material orders to the list.
   - Assign employees to specific cells or associate orders with employees.

3. **Edit Functionality**:

   - Modify existing employee details, cell information, or material orders.
   - Changes are immediately reflected in the UI.

4. **Delete Functionality**:

   - Remove employees, cells, or orders from the system.
   - Includes confirmation prompts to prevent accidental deletions.

5. **Authentication**:

   - The header component dynamically hides or shows 'login' and 'register' links based on the user's authentication state.

6. **Admin Management**:

   - To access the system, users must log in as a Django superuser. This ensures secure access and centralized control.

---

## Technology Stack

- **Frontend Framework**: Angular 18
- **Routing**: Custom `app.routes.ts` for managing navigation.
- **State Management**: Local component state management.

---

## API Integration

This project integrates with a backend API to fetch, update, and delete employee, material order, and cell data. Ensure the API endpoints are accessible for full functionality.

### Example API Endpoints:

- `GET /employees` - Fetch all employees.
- `POST /employees` - Add a new employee.
- `PUT /employees/:id` - Update employee details.
- `DELETE /employees/:id` - Remove an employee.
- `GET /orders` - Fetch all material orders.
- `POST /orders` - Add a new order.
- `PUT /orders/:id` - Update order details.
- `DELETE /orders/:id` - Remove an order.

---

## Setup and Installation

### Angular Setup

1. Clone the repository.

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Run the development server.

   ```bash
   ng serve
   ```

   Access the application at `http://localhost:4200/`.

### Django Setup

1. Install Python and Django.

   ```bash
   pip install django
   ```

2. Create a new Django project.

   ```bash
   django-admin startproject backend
   cd backend
   ```

3. Create a Django superuser for authentication.

   ```bash
   python manage.py createsuperuser
   ```

   Follow the prompts to set up the superuser credentials.

4. Start the Django development server.

   ```bash
   python manage.py runserver
   ```

   Access the backend at `http://127.0.0.1:8000/`.

5. Create a new app for managing API endpoints.

   ```bash
   python manage.py startapp api
   ```

6. Configure the app in `settings.py` and define models, views, and serializers as needed.

---

## How to Use

1. **Authentication**:

   - Log in using the Django superuser credentials.
   - This ensures secure access to the system.

2. **Managing Employees, Material Orders, and Cells**:

   - Use the navigation to access employee, order, or cell management.
   - Add, edit, or delete records using the respective options.

3. **Real-time Updates**:

   - All changes made are immediately visible in the UI.

---

## Known Issues and Limitations

- The project currently uses local state management; advanced state solutions (e.g., NgRx) are not implemented.
- API endpoints must be live and configured properly for the application to work.
- Basic error handling is in place but can be improved for better user feedback.

---

## Future Enhancements

1. Integrate advanced state management using NgRx or similar solutions.
2. Implement unit and end-to-end testing for robust code quality.
3. Add advanced search and filter capabilities for employees, material orders, and cells.
4. Improve UI/UX for a more seamless user experience.



## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute.

