# 🎓 Student Management System - Java Console Studio
> A production-quality, enterprise-standard Java Console Application demonstrating object-oriented design, robust input validation, exception handling, and clean code principles. Ready for internship submissions and technical portfolios.

---

## 📌 Project Overview
This project is a fully-featured, menu-driven **Student Management System (SMS)** engineered in modern Java (Java 11+ compatible). Designed with real-world developer practices, it models standard internship project structures, showcasing clear separation of concerns by isolating models, logic, utilities, and execution pipelines.

The application leverages **Strict Object-Oriented Programming (OOP)**, the **Java Collections Framework** (`ArrayList`), custom exceptions, and strong input sanitization/regex verification. 

---

## 🚀 Key Features & Highlights

1. **➕ Add New Student**: Prompts for unique Student IDs, names, age ranges, department names, and email structures. Enforces unique constraint checks to prevent double entries.
2. **📋 View All Students**: Renders a visually aligned, highly polished ASCII-tabular database view of all records, including age and department statistics.
3. **🔍 Search Student by ID**: Retrieves a target profile instantly, rendering it inside a clean card-style console output if found.
4. **⚙️ Update Student Details**: Finds active records and supports selective updates (press **Enter** to keep existing fields, or type new values to replace them).
5. **❌ Delete Student Record**: Prompts for target student deletion with an additional verification confirmation stage to prevent accidental data loss.
6. **📊 Real-time Metrics**: Displays live database status, storage details, and enrolled headcount checks.
7. **🔒 Safe Console Interactions**: Guards scanner inputs from crashing. Handles alphabetical letters typed in numeric inputs, invalid ages (<15 or >100), and malformed emails.
8. **🌱 Pre-populated Mock Data**: Seeds 4 sample students right on launch, allowing developers and evaluators to test all search, update, and sort menus instantly without manual keying.

---

## 📂 Folder Structure & Architectural Purpose

```text
Console-Application/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── intern/
│   │               └── consoleapp/
│   │                   ├── exception/
│   │                   │   └── StudentException.java  # Custom application-specific business exceptions
│   │                   ├── model/
│   │                   │   └── Student.java           # Encapsulated student data model with defensive setters
│   │                   ├── service/
│   │                   │   └── StudentService.java    # Core service layer handling memory database storage
│   │                   ├── utils/
│   │                   │   └── InputUtils.java        # Input filters, range validators, and custom formatters
│   │                   └── Main.java                  # Console application driver & user interface controller
├── .gitignore                                         # Prevents build target and IDE specific tracking
├── pom.xml                                            # Maven project configuration and dependencies build specification
└── README.md                                          # Complete technical project documentation
```

### Explanations of Core Packages:
*   **`exception/`**: Holds custom exception classes (`StudentException` and its nested extensions `NotFound` and `DuplicateId`). This bypasses the anti-pattern of throwing generic `Exception` objects, keeping exceptions targeted, trace-friendly, and semantic.
*   **`model/`**: Contains the `Student` object. Encapsulation is heavily prioritized here: fields are private, and setter methods validate constraints before letting fields update (e.g., throwing error messages if ages are out-of-bounds or names are empty).
*   **`service/`**: Acts as the backend controller in memory. Houses the central database collection (`List<Student>`) and exposes services to mutate or fetch from this collection. It utilizes modern Java streams for item queries.
*   **`utils/`**: Isolates all logic that deals with formatting or standard console `Scanner` handling. Prevents typical scanner buffering traps (such as the standard *nextLine()* skip anomaly after *nextInt()*) and parses numbers safely using `try-catch` structures.
*   **`Main.java`**: The main presentation layer. Loops standard option inputs and routes requests, serving as the user-facing controller.

---

## 🛠️ Installation & Getting Started

### Prerequisites
*   **Java Development Kit (JDK)**: JDK 11 or higher (Java 17 / 21 highly recommended).
*   **Apache Maven**: Standard build orchestrator tool (Version 3.6 or higher).
*   **IDE**: IntelliJ IDEA, Eclipse, or Visual Studio Code (configured with Java Extensions).

---

## 🖥️ Build & Run Instructions

Follow these step-by-step commands to build and run the application from your terminal or command prompt:

### 1. Clone or Move to the Directory:
```bash
cd Console-Application
```

### 2. Compile and Build using Maven:
Run a clean install compile check to verify setup and build the JAR artifact:
```bash
mvn clean package
```

### 3. Run the Application:
Use the customized Maven Exec integration to launch the application instantly inside your active terminal:
```bash
mvn exec:java
```

Alternatively, run the compiled binary directly via standard Java runtime:
```bash
java -jar target/student-management-system-1.0.0.jar
```

---

## 📝 User Option Scenarios & Sample Console Output

### 1. Main Menu Screen
Upon launching the program, you will see a stylized startup interface containing immediate options:
```text
┌───────────────────────────────────────────────────────┐
│                                                       │
│    🎓  STUDENT MANAGEMENT SYSTEM - CONSOLE STUDIO    │
│    Version 1.0.0 | Internship Portfolio Submission    │
│                                                       │
└───────────────────────────────────────────────────────┘
System initialized successfully with 4 sample records.

========== MAIN MENU ==========
1. ➕ Add New Student
2. 📋 View All Students
3. 🔍 Search Student by ID
4. ⚙️  Update Student Details
5. ❌ Delete Student Record
6. 📊 Count Total Students
7. 🚪 Exit Application
===============================
👉 Enter your choice (1-7): 
```

### 2. Viewing All Students (Menu Selection `2`)
Choosing option 2 renders the list of active students. Note the formatted ASCII table:
```text
=======================================================
  REGISTERED STUDENT RECORDS 
=======================================================
+------------+----------------------+------+--------------------+---------------------------+
| ID         | NAME                 | AGE  | DEPARTMENT         | EMAIL                     |
+------------+----------------------+------+--------------------+---------------------------+
| STU1001    | Emma Watson          | 21   | Computer Science   | emma.w@univ.edu           |
| STU1002    | Alex Mercer          | 22   | Bio-Engineering    | alex.m@univ.edu           |
| STU1003    | Sophia Lin           | 20   | Mathematics        | sophia.l@univ.edu         |
| STU1004    | David Kross          | 23   | Mechanical Eng     | david.k@univ.edu          |
+------------+----------------------+------+--------------------+---------------------------+
Total Count: 4 student(s) currently registered.
```

### 3. Adding a Student (Menu Selection `1`)
Choosing option 1 guides you through a step-by-step validator workflow. If you enter an existing ID, it stops immediately:
```text
=======================================================
  ADD NEW STUDENT 
=======================================================
Enter Student ID (e.g., STU1005): STU1002
⚠️ Error: A student with ID 'STU1002' already exists in the system.
```

If entering a fresh record:
```text
=======================================================
  ADD NEW STUDENT 
=======================================================
Enter Student ID (e.g., STU1005): STU1005
Enter Full Name: Sarah Connor
Enter Age (15 - 100): 22
Enter Department (e.g., Computer Science): Robotics
Enter Student Email: sarah.c@sky.net

✨ SUCCESS: Student 'Sarah Connor' was registered successfully!
```

---

## 📸 Capturing Screenshots for Your Portfolio

To submit this project for internships or share it on GitHub, capture the following standard screenshots. Use **high-contrast dark mode terminals** for maximum contrast:

1.  **Main Menu Startup**: Show the startup banner and choices.
2.  **Add Student (Validation Error)**: Screen depicting a validation trigger (e.g. invalid age like `12` or invalid email).
3.  **Add Student (Success)**: Clean execution registering `STU1005`.
4.  **View All Students**: Show the clean ASCII bordered data table.
5.  **Search Student**: Illustrate finding a student by typing `STU1001` and displaying their detail card.
6.  **Update Student**: Showcase hitting Enter on some fields and changing others to demonstrate selective updates.
7.  **Delete Student (Cancellation vs. Success)**: Illustrate typing `N` first to preserve, and then typing `Y` to verify successful deletion.

---

## 🐙 Git Workflow & GitHub Submission Guide

When preparing your Git history for portfolio review, make clean, atomic commits. This shows reviewer teams that you write code incrementally and follow professional engineering practices.

### 1. Suggested Commit History
To simulate real-world team practices, aim for these sequential commits:
*   `feat: initialize maven structure, project directories, and .gitignore`
*   `feat: construct Student model class with defensive encapsulated getters/setters`
*   `feat: build custom Exception class structures for NotFound and DuplicateId scenarios`
*   `feat: implement StudentService business operations with pre-populated seed data`
*   `feat: create InputUtils library with scanner-safe parser validation methods`
*   `feat: craft final console menu driver inside Main and connect user actions`
*   `test: verify database CRUD operations and test input validations`
*   `docs: finalize installation instructions and screenshots placeholders in README`

### 2. GitHub Metadata Setup
Make sure to configure your repository settings so recruiter teams find your project:
*   **Repository Description**: `🎓 High-quality, production-ready Student Management System engineered in Java demonstrating core OOP, custom exception frameworks, clean code structures, and input filters.`
*   **Repository Topics / Tags**: `java`, `oop`, `console-application`, `student-management-system`, `clean-code`, `portfolio`, `internship`, `software-engineering`

---

## 🔮 Future Improvements
*   **💾 Database Persistence**: Connect the system to SQLite or PostgreSQL using JDBC or Spring Data JPA.
*   **☁️ REST API Layer**: Refactor the project to run as a Spring Boot application.
*   **🔐 User Authentication**: Add login credentials with roles (`ADMIN` for writing/deleting, `STUDENT` for viewing).

---

## 👤 Author
*   **Your Name** - [GitHub Profile Link](https://github.com/your-username)
*   **Email**: `your-email@example.com`
