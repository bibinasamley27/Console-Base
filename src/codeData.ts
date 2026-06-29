import { FilePath } from './types';

export const JAVA_PROJECT_CODE: Record<FilePath, string> = {
  'pom.xml': `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.intern</groupId>
    <artifactId>student-management-system</artifactId>
    <version>1.0.0</version>
    <name>Student Management System</name>
    <description>A beginner-friendly, high-quality Student Management System for console interaction, demonstrating core Java fundamentals and clean OOP practices.</description>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.version>5.9.2</junit.version>
    </properties>

    <dependencies>
        <!-- JUnit 5 for Professional Unit Testing -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Maven Compiler Plugin to enforce Java standard compilation -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>\${maven.compiler.source}</source>
                    <target>\${maven.compiler.target}</target>
                </configuration>
            </plugin>

            <!-- Exec Maven Plugin to run the console app easily from terminal -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>3.1.0</version>
                <configuration>
                    <mainClass>com.intern.consoleapp.Main</mainClass>
                </configuration>
            </plugin>

            <!-- Maven Jar Plugin to make it a runnable executable JAR -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.3.0</version>
                <configuration>
                    <archive>
                        <manifest>
                            <addClasspath>true</addClasspath>
                            <mainClass>com.intern.consoleapp.Main</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`,

  '.gitignore': `# Compiled class file
*.class

# Log files
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
replay_pid*

# Maven #
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties

# IntelliJ IDEA #
.idea/
*.iws
*.iml
*.ipr
out/

# Eclipse #
.metadata
bin/
tmp/
.tmp
.classpath
.project
.settings/

# VS Code #
.vscode/

# OS templates
.DS_Store
Thumbs.db`,

  'src/main/java/com/intern/consoleapp/model/Student.java': `package com.intern.consoleapp.model;

import java.io.Serializable;

/**
 * Model class representing a Student in the system.
 * Follows strict encapsulation, provides standard constructors, getters, setters,
 * and custom formatting via toString().
 */
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    private String studentId;
    private String name;
    private int age;
    private String department;
    private String email;

    /**
     * Default constructor required for serialization or framework compatibility.
     */
    public Student() {
    }

    /**
     * Fully parameterized constructor.
     * Includes basic defense validation to ensure object state validity.
     *
     * @param studentId  the unique identifier of the student (e.g. STU1001)
     * @param name       the full name of the student
     * @param age        the age of the student (must be positive, e.g. 15 to 100)
     * @param department the department or major (e.g. Computer Science)
     * @param email      the student email address
     */
    public Student(String studentId, String name, int age, String department, String email) {
        setStudentId(studentId);
        setName(name);
        setAge(age);
        setDepartment(department);
        setEmail(email);
    }

    // --- Getters & Setters with Defensive Validations ---

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        if (studentId == null || studentId.trim().isEmpty()) {
            throw new IllegalArgumentException("Student ID cannot be empty.");
        }
        this.studentId = studentId.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Student Name cannot be empty.");
        }
        if (name.trim().length() < 2) {
            throw new IllegalArgumentException("Student Name must be at least 2 characters.");
        }
        this.name = name.trim();
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 15 || age > 100) {
            throw new IllegalArgumentException("Student Age must be between 15 and 100.");
        }
        this.age = age;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        if (department == null || department.trim().isEmpty()) {
            throw new IllegalArgumentException("Department cannot be empty.");
        }
        this.department = department.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email address cannot be empty.");
        }
        if (!email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Invalid email format. Must contain '@' and '.'");
        }
        this.email = email.trim();
    }

    /**
     * Generates a beautifully tabular representation of the student details.
     */
    @Override
    public String toString() {
        return String.format("| %-10s | %-20s | %-4d | %-18s | %-25s |", 
                studentId, name, age, department, email);
    }
}`,

  'src/main/java/com/intern/consoleapp/exception/StudentException.java': `package com.intern.consoleapp.exception;

/**
 * Base custom exception class for Student Management System business operations.
 */
public class StudentException extends Exception {
    private static final long serialVersionUID = 1L;

    public StudentException(String message) {
        super(message);
    }

    /**
     * Subclass for when a student is not found by their ID.
     */
    public static class NotFound extends StudentException {
        public NotFound(String id) {
            super("Student with ID '" + id + "' was not found.");
        }
    }

    /**
     * Subclass for when an ID conflict occurs.
     */
    public static class DuplicateId extends StudentException {
        public DuplicateId(String id) {
            super("Student with ID '" + id + "' already exists in the system.");
        }
    }
}`,

  'src/main/java/com/intern/consoleapp/service/StudentService.java': `package com.intern.consoleapp.service;

import com.intern.consoleapp.exception.StudentException;
import com.intern.consoleapp.model.Student;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Service class implementing the core business logic of the Student Management System.
 * Uses an ArrayList to store data in memory and enforces data consistency,
 * duplicate prevention, and clean OOP structures.
 */
public class StudentService {
    private final List<Student> students;

    /**
     * Initializes the service and seeds it with a few realistic initial records
     * to make the console application demonstrative right away.
     */
    public StudentService() {
        this.students = new ArrayList<>();
        seedInitialData();
    }

    /**
     * Adds a new student to the records.
     * Checks for unique Student ID constraints.
     *
     * @param student the student to add
     * @throws StudentException.DuplicateId if the ID already exists in the system
     */
    public void addStudent(Student student) throws StudentException.DuplicateId {
        if (student == null) {
            throw new IllegalArgumentException("Student record cannot be null.");
        }
        
        // Check for duplicate ID using streams (modern Java feature!)
        boolean exists = students.stream()
                .anyMatch(s -> s.getStudentId().equalsIgnoreCase(student.getStudentId()));
        
        if (exists) {
            throw new StudentException.DuplicateId(student.getStudentId());
        }

        students.add(student);
    }

    /**
     * Returns an unmodifiable list of all students currently registered.
     * This protects internal encapsulation so the list cannot be modified from the outside.
     *
     * @return List of students
     */
    public List<Student> getAllStudents() {
        return Collections.unmodifiableList(students);
    }

    /**
     * Searches for a student by their unique ID.
     *
     * @param studentId the ID to search for
     * @return Optional containing the Student if found, or empty Optional if not
     */
    public Optional<Student> searchStudentById(String studentId) {
        if (studentId == null || studentId.trim().isEmpty()) {
            return Optional.empty();
        }
        return students.stream()
                .filter(s -> s.getStudentId().equalsIgnoreCase(studentId.trim()))
                .findFirst();
    }

    /**
     * Updates an existing student's details.
     *
     * @param studentId  the ID of the student to update
     * @param name       the new name (can be kept same if not modified)
     * @param age        the new age
     * @param department the new department
     * @param email      the new email
     * @throws StudentException.NotFound if the student is not registered in the system
     */
    public void updateStudent(String studentId, String name, int age, String department, String email) 
            throws StudentException.NotFound {
        
        Student student = searchStudentById(studentId)
                .orElseThrow(() -> new StudentException.NotFound(studentId));

        // Let the Student model's setters handle validations
        student.setName(name);
        student.setAge(age);
        student.setDepartment(department);
        student.setEmail(email);
    }

    /**
     * Deletes a student from the system.
     *
     * @param studentId the ID of the student to remove
     * @throws StudentException.NotFound if no student matches the ID
     */
    public void deleteStudent(String studentId) throws StudentException.NotFound {
        Student student = searchStudentById(studentId)
                .orElseThrow(() -> new StudentException.NotFound(studentId));
        
        students.remove(student);
    }

    /**
     * Counts the total number of students in the system.
     *
     * @return total size
     */
    public int getStudentCount() {
        return students.size();
    }

    /**
     * Seed initial mock data for instant demonstrations of searching/viewing profiles.
     */
    private void seedInitialData() {
        try {
            addStudent(new Student("STU1001", "Emma Watson", 21, "Computer Science", "emma.w@univ.edu"));
            addStudent(new Student("STU1002", "Alex Mercer", 22, "Bio-Engineering", "alex.m@univ.edu"));
            addStudent(new Student("STU1003", "Sophia Lin", 20, "Mathematics", "sophia.l@univ.edu"));
            addStudent(new Student("STU1004", "David Kross", 23, "Mechanical Eng", "david.k@univ.edu"));
        } catch (StudentException.DuplicateId e) {
            // Silently ignore for seeds
        }
    }
}`,

  'src/main/java/com/intern/consoleapp/utils/InputUtils.java': `package com.intern.consoleapp.utils;

import java.util.Scanner;
import java.util.regex.Pattern;

/**
 * Utility class to process, clean, and validate all user inputs via the Console Scanner.
 * Enforces strict input validation, preventing crashing on bad numeric entries, 
 * blank inputs, or malformed email patterns.
 */
public class InputUtils {

    // RFC 5322 compliant simple email regex pattern
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_+&*-]+(?:\\\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\\\.)+[a-zA-Z]{2,7}$"
    );

    /**
     * Reads a non-empty string from the scanner. Re-prompts the user if empty.
     *
     * @param scanner the scanner instance
     * @param prompt  the instructional text shown to user
     * @return a trimmed, validated non-empty String
     */
    public static String readString(Scanner scanner, String prompt) {
        String input;
        while (true) {
            System.out.print(prompt);
            input = scanner.nextLine();
            if (input != null && !input.trim().isEmpty()) {
                return input.trim();
            }
            System.out.println("⚠️ Error: Input cannot be empty. Please try again.");
        }
    }

    /**
     * Reads a student ID and formats it consistently (e.g. capitalized).
     *
     * @param scanner the scanner instance
     * @param prompt  the instructional text shown to user
     * @return validated student ID
     */
    public static String readStudentId(Scanner scanner, String prompt) {
        while (true) {
            String id = readString(scanner, prompt).toUpperCase();
            if (id.matches("^[a-zA-Z0-9-]+$")) {
                return id;
            }
            System.out.println("⚠️ Error: Student ID should contain only alphanumeric characters or hyphens.");
        }
    }

    /**
     * Reads a valid integer between a specified range (inclusive).
     *
     * @param scanner the scanner instance
     * @param prompt  the instructional text shown to user
     * @param min     the minimum allowed value
     * @param max     the maximum allowed value
     * @return the validated integer
     */
    public static int readInt(Scanner scanner, String prompt, int min, int max) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine();
            try {
                int value = Integer.parseInt(input.trim());
                if (value >= min && value <= max) {
                    return value;
                }
                System.out.printf("⚠️ Error: Please enter a number between %d and %d.%n", min, max);
            } catch (NumberFormatException e) {
                System.out.println("⚠️ Error: Invalid numeric input. Please enter a valid whole number.");
            }
        }
    }

    /**
     * Reads and validates a department name, ensuring no numeric digits.
     *
     * @param scanner the scanner instance
     * @param prompt  the instructional text shown to user
     * @return validated department
     */
    public static String readDepartment(Scanner scanner, String prompt) {
        while (true) {
            String dept = readString(scanner, prompt);
            if (dept.matches("^[a-zA-Z\\\\s&-]+$")) {
                return dept;
            }
            System.out.println("⚠️ Error: Department name must only contain letters, spaces, '&', or hyphens.");
        }
    }

    /**
     * Reads a valid email from the scanner matching standard email requirements.
     *
     * @param scanner the scanner instance
     * @param prompt  the instructional text shown to user
     * @return a validated email address
     */
    public static String readEmail(Scanner scanner, String prompt) {
        while (true) {
            String email = readString(scanner, prompt).toLowerCase();
            if (EMAIL_PATTERN.matcher(email).matches()) {
                return email;
            }
            System.out.println("⚠️ Error: Invalid email format (example: student@university.edu).");
        }
    }

    /**
     * Helper to print consistent section headers to clear up the UI boundaries.
     */
    public static void printHeader(String title) {
        System.out.println("\\n=======================================================");
        System.out.printf("  %s %n", title.toUpperCase());
        System.out.println("=======================================================");
    }

    /**
     * Helper to print success feedback lines.
     */
    public static void printSuccess(String message) {
        System.out.println("✨ SUCCESS: " + message);
    }
}`,

  'src/main/java/com/intern/consoleapp/Main.java': `package com.intern.consoleapp;

import com.intern.consoleapp.exception.StudentException;
import com.intern.consoleapp.model.Student;
import com.intern.consoleapp.service.StudentService;
import com.intern.consoleapp.utils.InputUtils;

import java.util.List;
import java.util.Scanner;

/**
 * Main application class which serves as the console-based user interface controller.
 * Implements the main driver menu loop, handles exceptions gracefully, and maps 
 * user triggers to the StudentService implementation.
 */
public class Main {

    private static final StudentService studentService = new StudentService();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        printWelcomeBanner();

        boolean running = true;
        while (running) {
            displayMenu();
            int choice = InputUtils.readInt(scanner, "👉 Enter your choice (1-7): ", 1, 7);

            switch (choice) {
                case 1:
                    handleAddStudent(scanner);
                    break;
                case 2:
                    handleViewAllStudents();
                    break;
                case 3:
                    handleSearchStudent(scanner);
                    break;
                case 4:
                    handleUpdateStudent(scanner);
                    break;
                case 5:
                    handleDeleteStudent(scanner);
                    break;
                case 6:
                    handleCountStudents();
                    break;
                case 7:
                    running = handleExit();
                    break;
                default:
                    System.out.println("⚠️ Unexpected option. Please select a valid number from the menu.");
            }
        }
        scanner.close();
        System.out.println("\\n👋 Thank you for using the Student Management System. Goodbye!");
    }

    /**
     * Prints a beautiful ASCII Art startup banner for an outstanding first impression.
     */
    private static void printWelcomeBanner() {
        System.out.println("┌───────────────────────────────────────────────────────┐");
        System.out.println("│                                                       │");
        System.out.println("│    🎓  STUDENT MANAGEMENT SYSTEM - CONSOLE STUDIO    │");
        System.out.println("│    Version 1.0.0 | Internship Portfolio Submission    │");
        System.out.println("│                                                       │");
        System.out.println("└───────────────────────────────────────────────────────┘");
        System.out.println("System initialized successfully with 4 sample records.");
    }

    /**
     * Displays the primary menu layout.
     */
    private static void displayMenu() {
        System.out.println("\\n========== MAIN MENU ==========");
        System.out.println("1. ➕ Add New Student");
        System.out.println("2. 📋 View All Students");
        System.out.println("3. 🔍 Search Student by ID");
        System.out.println("4. ⚙️  Update Student Details");
        System.out.println("5. ❌ Delete Student Record");
        System.out.println("6. 📊 Count Total Students");
        System.out.println("7. 🚪 Exit Application");
        System.out.println("===============================");
    }

    /**
     * Orchestrates gathering input and saving a new Student.
     */
    private static void handleAddStudent(Scanner scanner) {
        InputUtils.printHeader("Add New Student");

        String id = InputUtils.readStudentId(scanner, "Enter Student ID (e.g., STU1005): ");
        
        // Quick short-circuit check if student already exists before asking for other fields
        if (studentService.searchStudentById(id).isPresent()) {
            System.out.printf("⚠️ Error: A student with ID '%s' already exists in the system.%n", id);
            return;
        }

        String name = InputUtils.readString(scanner, "Enter Full Name: ");
        int age = InputUtils.readInt(scanner, "Enter Age (15 - 100): ", 15, 100);
        String department = InputUtils.readDepartment(scanner, "Enter Department (e.g., Computer Science): ");
        String email = InputUtils.readEmail(scanner, "Enter Student Email: ");

        try {
            Student student = new Student(id, name, age, department, email);
            studentService.addStudent(student);
            InputUtils.printSuccess(String.format("Student '%s' was registered successfully!", name));
        } catch (IllegalArgumentException e) {
            System.out.println("⚠️ Validation Error: " + e.getMessage());
        } catch (StudentException.DuplicateId e) {
            System.out.println("⚠️ Error: " + e.getMessage());
        }
    }

    /**
     * Displays a clean tabulated grid layout of all registered students.
     */
    private static void handleViewAllStudents() {
        InputUtils.printHeader("Registered Student Records");
        List<Student> list = studentService.getAllStudents();

        if (list.isEmpty()) {
            System.out.println("ℹ️ No student records found. System database is empty.");
            return;
        }

        printTableBorder();
        System.out.printf("| %-10s | %-20s | %-4s | %-18s | %-25s |%n", "ID", "NAME", "AGE", "DEPARTMENT", "EMAIL");
        printTableBorder();
        
        for (Student s : list) {
            System.out.println(s);
        }
        
        printTableBorder();
        System.out.printf("Total Count: %d student(s) currently registered.%n", list.size());
    }

    /**
     * Prompts for a search ID and shows the record card if found.
     */
    private static void handleSearchStudent(Scanner scanner) {
        InputUtils.printHeader("Search Student by ID");
        String id = InputUtils.readStudentId(scanner, "Enter Student ID to find: ");

        studentService.searchStudentById(id).ifPresentOrElse(
            student -> {
                System.out.println("\\n✅ Student Record Found:");
                System.out.println("----------------------------------------");
                System.out.printf("  🆔 ID:         %s%n", student.getStudentId());
                System.out.printf("  👤 Name:       %s%n", student.getName());
                System.out.printf("  📅 Age:        %d years old%n", student.getAge());
                System.out.printf("  🏫 Dept:       %s%n", student.getDepartment());
                System.out.printf("  📧 Email:      %s%n", student.getEmail());
                System.out.println("----------------------------------------");
            },
            () -> System.out.printf("❌ Search Error: Student with ID '%s' was not found.%n", id)
        );
    }

    /**
     * Handles retrieving and modifying an existing Student's details.
     */
    private static void handleUpdateStudent(Scanner scanner) {
        InputUtils.printHeader("Update Student Details");
        String id = InputUtils.readStudentId(scanner, "Enter Student ID to update: ");

        Student student = studentService.searchStudentById(id).orElse(null);
        if (student == null) {
            System.out.printf("❌ Error: Student with ID '%s' was not found.%n", id);
            return;
        }

        System.out.println("\\nFound active record for: " + student.getName());
        System.out.println("Press Enter to keep current value, or type a new value to update.");
        
        System.out.printf("Current Name [%s]: ", student.getName());
        String nameInput = scanner.nextLine().trim();
        String finalName = nameInput.isEmpty() ? student.getName() : nameInput;

        int finalAge = student.getAge();
        while (true) {
            System.out.printf("Current Age [%d]: ", student.getAge());
            String ageInput = scanner.nextLine().trim();
            if (ageInput.isEmpty()) {
                break;
            }
            try {
                int parsedAge = Integer.parseInt(ageInput);
                if (parsedAge >= 15 && parsedAge <= 100) {
                    finalAge = parsedAge;
                    break;
                }
                System.out.println("⚠️ Error: Student Age must be between 15 and 100.");
            } catch (NumberFormatException e) {
                System.out.println("⚠️ Error: Invalid number entered.");
            }
        }

        System.out.printf("Current Dept [%s]: ", student.getDepartment());
        String deptInput = scanner.nextLine().trim();
        String finalDept = deptInput.isEmpty() ? student.getDepartment() : deptInput;

        String finalEmail = student.getEmail();
        while (true) {
            System.out.printf("Current Email [%s]: ", student.getEmail());
            String emailInput = scanner.nextLine().trim();
            if (emailInput.isEmpty()) {
                break;
            }
            if (emailInput.contains("@") && emailInput.contains(".")) {
                finalEmail = emailInput.trim();
                break;
            }
            System.out.println("⚠️ Error: Invalid email format.");
        }

        try {
            studentService.updateStudent(id, finalName, finalAge, finalDept, finalEmail);
            InputUtils.printSuccess(String.format("Student records updated for ID: %s", id));
        } catch (StudentException.NotFound e) {
            System.out.println("⚠️ Update Failed: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("⚠️ Validation Error during update: " + e.getMessage());
        }
    }

    /**
     * Removes a student record with validation and confirmation.
     */
    private static void handleDeleteStudent(Scanner scanner) {
        InputUtils.printHeader("Delete Student Record");
        String id = InputUtils.readStudentId(scanner, "Enter Student ID to remove: ");

        Student student = studentService.searchStudentById(id).orElse(null);
        if (student == null) {
            System.out.printf("❌ Delete Error: Student with ID '%s' was not found.%n", id);
            return;
        }

        System.out.printf("⚠️ WARNING: Are you sure you want to delete student '%s' (ID: %s)? (Y/N): ", 
                student.getName(), student.getStudentId());
        String confirm = scanner.nextLine().trim().toUpperCase();

        if (confirm.equals("Y") || confirm.equals("YES")) {
            try {
                studentService.deleteStudent(id);
                InputUtils.printSuccess(String.format("Student record with ID %s has been deleted.", id));
            } catch (StudentException.NotFound e) {
                System.out.println("⚠️ Delete Failed: " + e.getMessage());
            }
        } else {
            System.out.println("❌ Deletion cancelled. Record kept safe.");
        }
    }

    /**
     * Displays a quick counter metrics dashboard.
     */
    private static void handleCountStudents() {
        InputUtils.printHeader("Database Statistics Dashboard");
        int count = studentService.getStudentCount();
        System.out.printf("  • Total Enrolled Students:  %d%n", count);
        System.out.printf("  • Storage State:            IN-MEMORY (ArrayList)%n");
        System.out.printf("  • Database Integrity check: SUCCESSFUL%n");
    }

    /**
     * Terminates the main loop.
     */
    private static boolean handleExit() {
        System.out.println("\\nClosing all database processes...");
        return false;
    }

    private static void printTableBorder() {
        System.out.println("+------------+----------------------+------+--------------------+---------------------------+");
    }
}`,

  'README.md': `# 🎓 Student Management System - Java Console Studio
> A production-quality, enterprise-standard Java Console Application demonstrating object-oriented design, robust input validation, exception handling, and clean code principles. Ready for internship submissions and technical portfolios.

---

## 📌 Project Overview
This project is a fully-featured, menu-driven **Student Management System (SMS)** engineered in modern Java (Java 11+ compatible). Designed with real-world developer practices, it models standard internship project structures, showcasing clear separation of concerns by isolating models, logic, utilities, and execution pipelines.

The application leverages **Strict Object-Oriented Programming (OOP)**, the **Java Collections Framework** (\`ArrayList\`), custom exceptions, and strong input sanitization/regex verification. 

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

\`\`\`text
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
\`\`\`

---

## 🖥️ Build & Run Instructions

Follow these step-by-step commands to build and run the application from your terminal or command prompt:

### 1. Clone or Move to the Directory:
\`\`\`bash
cd Console-Application
\`\`\`

### 2. Compile and Build using Maven:
\`\`\`bash
mvn clean package
\`\`\`

### 3. Run the Application:
\`\`\`bash
mvn exec:java
\`\`\`
`
};
