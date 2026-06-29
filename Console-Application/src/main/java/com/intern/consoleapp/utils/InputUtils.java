package com.intern.consoleapp.utils;

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
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
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
            if (dept.matches("^[a-zA-Z\\s&-]+$")) {
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
        System.out.println("\n=======================================================");
        System.out.printf("  %s %n", title.toUpperCase());
        System.out.println("=======================================================");
    }

    /**
     * Helper to print success feedback lines.
     */
    public static void printSuccess(String message) {
        System.out.println("✨ SUCCESS: " + message);
    }
}
