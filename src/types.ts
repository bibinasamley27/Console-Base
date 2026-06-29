export interface StudentData {
  studentId: string;
  name: string;
  age: number;
  department: string;
  email: string;
}

export type FilePath = 
  | 'pom.xml'
  | '.gitignore'
  | 'src/main/java/com/intern/consoleapp/model/Student.java'
  | 'src/main/java/com/intern/consoleapp/exception/StudentException.java'
  | 'src/main/java/com/intern/consoleapp/service/StudentService.java'
  | 'src/main/java/com/intern/consoleapp/utils/InputUtils.java'
  | 'src/main/java/com/intern/consoleapp/Main.java'
  | 'README.md';

export interface FileItem {
  name: string;
  path: FilePath;
  type: 'file' | 'dir';
  children?: FileItem[];
}
