# Project Workflow

This app helps users create an account, sign in, and manage their personal tasks from a dashboard.

## How The App Starts

When someone opens the app, it checks whether they are already signed in.

If they are not signed in, they see the signup page first. They can create an account using their name, email, and password.

If they already have an account, they can go to the login page and sign in.

After signup or login, the app saves the user’s access in the browser and opens the dashboard.

## Dashboard

The dashboard uses the saved user information to greet the person by name.

From the dashboard, the user can:

- Create a new task
- Choose a due date and due time
- Mark a task as complete
- Mark a completed task as incomplete again
- Delete a task
- View tasks by category
- Sign out

## Sidebar

The sidebar controls what the user sees on the dashboard.

- **All Tasks** shows every task.
- **Today** shows tasks due today.
- **Upcoming** shows incomplete tasks with future due dates.
- **Settings** shows account information and sign out.
- **New Task** focuses the task input so the user can quickly add a task.

## Upcoming Events

The Upcoming Events section is connected to the user’s real task list.

It shows incomplete tasks that have upcoming due dates, so it changes as the user creates, completes, or deletes tasks.

## Sign Out

When the user signs out, the app removes their saved access from the browser and returns them to the login flow.

## Backend Connection

The frontend talks to the backend whenever the user signs up, logs in, creates a task, updates a task, deletes a task, or loads saved tasks.

The backend checks that the user is signed in before allowing task actions. This keeps each user’s tasks private to their own account.
