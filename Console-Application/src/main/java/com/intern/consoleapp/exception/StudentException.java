package com.intern.consoleapp.exception;

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
}
