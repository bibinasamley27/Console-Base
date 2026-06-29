import { StudentData } from './types';

export type SimulatorPhase =
  | 'welcome'
  | 'menu'
  | 'add_id'
  | 'add_name'
  | 'add_age'
  | 'add_dept'
  | 'add_email'
  | 'search_id'
  | 'update_id'
  | 'update_name'
  | 'update_age'
  | 'update_dept'
  | 'update_email'
  | 'delete_id'
  | 'delete_confirm'
  | 'exited';

export interface SimulatorState {
  history: string[];
  students: StudentData[];
  phase: SimulatorPhase;
  currentInput?: string;
  prompt: string;
  // Buffer for holding wizard progress
  tempStudent: Partial<StudentData> & { originalStudent?: StudentData };
}

export const INITIAL_STUDENTS: StudentData[] = [
  { studentId: 'STU1001', name: 'Emma Watson', age: 21, department: 'Computer Science', email: 'emma.w@univ.edu' },
  { studentId: 'STU1002', name: 'Alex Mercer', age: 22, department: 'Bio-Engineering', email: 'alex.m@univ.edu' },
  { studentId: 'STU1003', name: 'Sophia Lin', age: 20, department: 'Mathematics', email: 'sophia.l@univ.edu' },
  { studentId: 'STU1004', name: 'David Kross', age: 23, department: 'Mechanical Eng', email: 'david.k@univ.edu' }
];

export const WELCOME_BANNER = [
  "┌───────────────────────────────────────────────────────┐",
  "│                                                       │",
  "│    🎓  STUDENT MANAGEMENT SYSTEM - CONSOLE STUDIO    │",
  "│    Version 1.0.0 | Internship Portfolio Submission    │",
  "│                                                       │",
  "└───────────────────────────────────────────────────────┘",
  "System initialized successfully with 4 sample records."
];

export const MENU_LINES = [
  "",
  "========== MAIN MENU ==========",
  "1. ➕ Add New Student",
  "2. 📋 View All Students",
  "3. 🔍 Search Student by ID",
  "4. ⚙️  Update Student Details",
  "5. ❌ Delete Student Record",
  "6. 📊 Count Total Students",
  "7. 🚪 Exit Application",
  "==============================="
];

function formatTableBorder() {
  return "+------------+----------------------+------+--------------------+---------------------------+";
}

function formatTableRow(s: StudentData) {
  // Simulates standard format mapping in Java: | %-10s | %-20s | %-4d | %-18s | %-25s |
  const idStr = s.studentId.padEnd(10).substring(0, 10);
  const nameStr = s.name.padEnd(20).substring(0, 20);
  const ageStr = s.age.toString().padEnd(4).substring(0, 4);
  const deptStr = s.department.padEnd(18).substring(0, 18);
  const emailStr = s.email.padEnd(25).substring(0, 25);
  return `| ${idStr} | ${nameStr} | ${ageStr} | ${deptStr} | ${emailStr} |`;
}

export function handleTerminalInput(state: SimulatorState, input: string): SimulatorState {
  const trimmedInput = input.trim();
  const history = [...state.history, `${state.prompt}${input}`];
  let students = [...state.students];
  let phase = state.phase;
  let prompt = state.prompt;
  let tempStudent = { ...state.tempStudent };

  const returnToMenu = (extraLines: string[] = []) => {
    return {
      history: [...history, ...extraLines, ...MENU_LINES],
      students,
      phase: 'menu' as SimulatorPhase,
      prompt: '👉 Enter your choice (1-7): ',
      tempStudent: {}
    };
  };

  switch (phase) {
    case 'welcome':
      // Any key or enter from welcome moves to menu
      return returnToMenu([]);

    case 'menu': {
      if (!trimmedInput) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Please enter a menu choice (1-7)."]
        };
      }
      const choice = parseInt(trimmedInput, 10);
      if (isNaN(choice) || choice < 1 || choice > 7) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Invalid choice. Please select a valid number between 1 and 7."]
        };
      }

      switch (choice) {
        case 1: // Add student
          return {
            history: [
              ...history,
              "",
              "=======================================================",
              "  ADD NEW STUDENT",
              "======================================================="
            ],
            students,
            phase: 'add_id',
            prompt: 'Enter Student ID (e.g., STU1005): ',
            tempStudent: {}
          };

        case 2: { // View all students
          const listLines = [
            "",
            "=======================================================",
            "  REGISTERED STUDENT RECORDS",
            "=======================================================",
            formatTableBorder(),
            `| ${"ID".padEnd(10)} | ${"NAME".padEnd(20)} | ${"AGE".padEnd(4)} | ${"DEPARTMENT".padEnd(18)} | ${"EMAIL".padEnd(25)} |`,
            formatTableBorder(),
          ];
          if (students.length === 0) {
            listLines.push("ℹ️ No student records found. System database is empty.");
          } else {
            students.forEach(s => listLines.push(formatTableRow(s)));
          }
          listLines.push(formatTableBorder());
          listLines.push(`Total Count: ${students.length} student(s) currently registered.`);
          return returnToMenu(listLines);
        }

        case 3: // Search Student
          return {
            history: [
              ...history,
              "",
              "=======================================================",
              "  SEARCH STUDENT BY ID",
              "======================================================="
            ],
            students,
            phase: 'search_id',
            prompt: 'Enter Student ID to find: ',
            tempStudent: {}
          };

        case 4: // Update student
          return {
            history: [
              ...history,
              "",
              "=======================================================",
              "  UPDATE STUDENT DETAILS",
              "======================================================="
            ],
            students,
            phase: 'update_id',
            prompt: 'Enter Student ID to update: ',
            tempStudent: {}
          };

        case 5: // Delete Student
          return {
            history: [
              ...history,
              "",
              "=======================================================",
              "  DELETE STUDENT RECORD",
              "======================================================="
            ],
            students,
            phase: 'delete_id',
            prompt: 'Enter Student ID to remove: ',
            tempStudent: {}
          };

        case 6: // Count Total
          const countLines = [
            "",
            "=======================================================",
            "  DATABASE STATISTICS DASHBOARD",
            "=======================================================",
            `  • Total Enrolled Students:  ${students.length}`,
            "  • Storage State:            IN-MEMORY (ArrayList)",
            "  • Database Integrity check: SUCCESSFUL"
          ];
          return returnToMenu(countLines);

        case 7: // Exit
          return {
            history: [
              ...history,
              "\nClosing all database processes...",
              "\n👋 Thank you for using the Student Management System. Goodbye!",
              "[Terminal session ended. Press 'Restart Session' to run again]"
            ],
            students,
            phase: 'exited',
            prompt: '> ',
            tempStudent: {}
          };
      }
      break;
    }

    // --- ADD STUDENT WORKFLOW ---
    case 'add_id': {
      const uId = trimmedInput.toUpperCase();
      if (!uId) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student ID cannot be empty. Please try again."]
        };
      }
      if (!/^[A-Z0-9-]+$/.test(uId)) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student ID should contain only alphanumeric characters or hyphens."]
        };
      }
      const existing = students.find(s => s.studentId.toUpperCase() === uId);
      if (existing) {
        return returnToMenu([
          `⚠️ Error: A student with ID '${uId}' already exists in the system.`
        ]);
      }
      tempStudent.studentId = uId;
      return {
        history,
        students,
        phase: 'add_name',
        prompt: 'Enter Full Name: ',
        tempStudent
      };
    }

    case 'add_name': {
      if (!trimmedInput) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student Name cannot be empty. Please try again."]
        };
      }
      if (trimmedInput.length < 2) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student Name must be at least 2 characters. Please try again."]
        };
      }
      tempStudent.name = trimmedInput;
      return {
        history,
        students,
        phase: 'add_age',
        prompt: 'Enter Age (15 - 100): ',
        tempStudent
      };
    }

    case 'add_age': {
      const age = parseInt(trimmedInput, 10);
      if (isNaN(age) || age < 15 || age > 100) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student Age must be between 15 and 100. Please try again."]
        };
      }
      tempStudent.age = age;
      return {
        history,
        students,
        phase: 'add_dept',
        prompt: 'Enter Department (e.g., Computer Science): ',
        tempStudent
      };
    }

    case 'add_dept': {
      if (!trimmedInput) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Department cannot be empty. Please try again."]
        };
      }
      if (!/^[a-zA-Z\s&-]+$/.test(trimmedInput)) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Department name must only contain letters, spaces, '&', or hyphens."]
        };
      }
      tempStudent.department = trimmedInput;
      return {
        history,
        students,
        phase: 'add_email',
        prompt: 'Enter Student Email: ',
        tempStudent
      };
    }

    case 'add_email': {
      const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(trimmedInput)) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Invalid email format (example: student@university.edu)."]
        };
      }
      tempStudent.email = trimmedInput.toLowerCase();
      
      const completeStudent: StudentData = {
        studentId: tempStudent.studentId!,
        name: tempStudent.name!,
        age: tempStudent.age!,
        department: tempStudent.department!,
        email: tempStudent.email!
      };

      students.push(completeStudent);

      return returnToMenu([
        `✨ SUCCESS: Student '${completeStudent.name}' was registered successfully!`
      ]);
    }

    // --- SEARCH WORKFLOW ---
    case 'search_id': {
      const searchId = trimmedInput.toUpperCase();
      if (!searchId) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student ID cannot be empty."]
        };
      }
      const target = students.find(s => s.studentId.toUpperCase() === searchId);
      if (target) {
        const resultLines = [
          "",
          "✅ Student Record Found:",
          "----------------------------------------",
          `  🆔 ID:         ${target.studentId}`,
          `  👤 Name:       ${target.name}`,
          `  📅 Age:        ${target.age} years old`,
          `  🏫 Dept:       ${target.department}`,
          `  📧 Email:      ${target.email}`,
          "----------------------------------------"
        ];
        return returnToMenu(resultLines);
      } else {
        return returnToMenu([
          `❌ Search Error: Student with ID '${searchId}' was not found.`
        ]);
      }
    }

    // --- DELETE WORKFLOW ---
    case 'delete_id': {
      const deleteId = trimmedInput.toUpperCase();
      if (!deleteId) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student ID cannot be empty."]
        };
      }
      const target = students.find(s => s.studentId.toUpperCase() === deleteId);
      if (!target) {
        return returnToMenu([
          `❌ Delete Error: Student with ID '${deleteId}' was not found.`
        ]);
      }
      tempStudent.originalStudent = target;
      return {
        history: [
          ...history,
          `⚠️ WARNING: Are you sure you want to delete student '${target.name}' (ID: ${target.studentId})? (Y/N): `
        ],
        students,
        phase: 'delete_confirm',
        prompt: '> ',
        tempStudent
      };
    }

    case 'delete_confirm': {
      const conf = trimmedInput.toUpperCase();
      if (conf === 'Y' || conf === 'YES') {
        const idToDelete = tempStudent.originalStudent?.studentId;
        students = students.filter(s => s.studentId !== idToDelete);
        return returnToMenu([
          `✨ SUCCESS: Student record with ID ${idToDelete} has been deleted.`
        ]);
      } else {
        return returnToMenu([
          "❌ Deletion cancelled. Record kept safe."
        ]);
      }
    }

    // --- UPDATE WORKFLOW ---
    case 'update_id': {
      const updateId = trimmedInput.toUpperCase();
      if (!updateId) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student ID cannot be empty."]
        };
      }
      const target = students.find(s => s.studentId.toUpperCase() === updateId);
      if (!target) {
        return returnToMenu([
          `❌ Error: Student with ID '${updateId}' was not found.`
        ]);
      }
      tempStudent.originalStudent = target;
      tempStudent.studentId = target.studentId;
      
      const nextPrompt = `Current Name [${target.name}]: `;
      return {
        history: [
          ...history,
          `Found active record for: ${target.name}`,
          "Press Enter to keep current value, or type a new value to update."
        ],
        students,
        phase: 'update_name',
        prompt: nextPrompt,
        tempStudent
      };
    }

    case 'update_name': {
      const current = tempStudent.originalStudent!;
      const newName = trimmedInput ? trimmedInput : current.name;
      if (trimmedInput && trimmedInput.length < 2) {
        return {
          ...state,
          history: [...history, "⚠️ Error: Student Name must be at least 2 characters. Please try again."]
        };
      }
      tempStudent.name = newName;

      return {
        history,
        students,
        phase: 'update_age',
        prompt: `Current Age [${current.age}]: `,
        tempStudent
      };
    }

    case 'update_age': {
      const current = tempStudent.originalStudent!;
      let newAge = current.age;
      if (trimmedInput) {
        const age = parseInt(trimmedInput, 10);
        if (isNaN(age) || age < 15 || age > 100) {
          return {
            ...state,
            history: [...history, "⚠️ Error: Student Age must be between 15 and 100. Please try again."]
          };
        }
        newAge = age;
      }
      tempStudent.age = newAge;

      return {
        history,
        students,
        phase: 'update_dept',
        prompt: `Current Dept [${current.department}]: `,
        tempStudent
      };
    }

    case 'update_dept': {
      const current = tempStudent.originalStudent!;
      let newDept = current.department;
      if (trimmedInput) {
        if (!/^[a-zA-Z\s&-]+$/.test(trimmedInput)) {
          return {
            ...state,
            history: [...history, "⚠️ Error: Department name must only contain letters, spaces, '&', or hyphens."]
          };
        }
        newDept = trimmedInput;
      }
      tempStudent.department = newDept;

      return {
        history,
        students,
        phase: 'update_email',
        prompt: `Current Email [${current.email}]: `,
        tempStudent
      };
    }

    case 'update_email': {
      const current = tempStudent.originalStudent!;
      let newEmail = current.email;
      if (trimmedInput) {
        const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(trimmedInput)) {
          return {
            ...state,
            history: [...history, "⚠️ Error: Invalid email format (example: student@university.edu)."]
          };
        }
        newEmail = trimmedInput.toLowerCase();
      }
      tempStudent.email = newEmail;

      // Commit the update in place
      students = students.map(s => {
        if (s.studentId === tempStudent.studentId) {
          return {
            studentId: tempStudent.studentId!,
            name: tempStudent.name!,
            age: tempStudent.age!,
            department: tempStudent.department!,
            email: tempStudent.email!
          };
        }
        return s;
      });

      return returnToMenu([
        `✨ SUCCESS: Student records updated for ID: ${tempStudent.studentId}`
      ]);
    }

    case 'exited': {
      // Typing anything or enter on exited phase restarts
      return {
        history: WELCOME_BANNER,
        students,
        phase: 'menu',
        prompt: '👉 Enter your choice (1-7): ',
        tempStudent: {}
      };
    }
  }

  return state;
}
