package com.intern.consoleapp.model;

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
}
