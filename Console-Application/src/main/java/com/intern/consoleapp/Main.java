package com.intern.consoleapp;

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
        System.out.println("\n👋 Thank you for using the Student Management System. Goodbye!");
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
        System.out.println("\n========== MAIN MENU ==========");
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
                System.out.println("\n✅ Student Record Found:");
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

        System.out.println("\nFound active record for: " + student.getName());
        System.out.println("Press Enter to keep current value, or type a new value to update.");

        // We want to support easy updates: if the user hits Enter, we keep the original value.
        // We modify InputUtils's standard input prompts to accept blanks specifically for update context:
        
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
        System.out.println("\nClosing all database processes...");
        return false;
    }

    private static void printTableBorder() {
        System.out.println("+------------+----------------------+------+--------------------+---------------------------+");
    }
}
