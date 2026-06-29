package com.intern.consoleapp.service;

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
}
