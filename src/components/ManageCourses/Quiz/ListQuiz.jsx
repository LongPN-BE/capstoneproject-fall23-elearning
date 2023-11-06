import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import LessonModal from '../../Lesson/LessonModal'; // Import the LessonModal component
import { courseQuestionBank, lessonSyllabus, lessonsData, syllabusData } from '../../../mock/mock-data';
import QuestionModel from './ListCourseQuestion/QuestionModel';
import QuestionBankModal from './ListCourseQuestion/QuestionBankModal';

export default function CreateQuiz() {
  const { courseId, syllabusId, lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with your actual data fetching logic for questions
    setQuestions(courseQuestionBank);
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question); // Set the selected question for editing
    setIsModalOpen(true);
  };

  const openBankModal = () => {
    setIsBankModalOpen(true);
  }

  const closeBankModal = () => {
    setIsBankModalOpen(false);
  }

  const closeModal = () => {
    setSelectedQuestion(null); // Clear the selected question
    setIsModalOpen(false);
  };

  const handleSave = (newQuestion) => {
    if (selectedQuestion) {
      // Editing an existing question
      const indexChange = newQuestion?.answerBank.findIndex((i) => i.id === newQuestion.correctAnswerId);
      if (indexChange !== -1) {
        // If the object with the specified ID is found in the answerBank
        const updatedAnswerBank = newQuestion.answerBank.map((item, index) => {
          if (index == indexChange) {
            // Create a new object for each item in the answerBank
            return {
              ...item,
              isCorrect: true, // Set isCorrect to false for all items
              // Add other updated properties here if needed
            };
          }
          else {
            return {
              ...item,
              isCorrect: false,
            };
          }
        });

        newQuestion.answerBank = updatedAnswerBank; // Update the answerBank in newQuestion
      }


      const updatedQuestions = questions.map((question) =>
        question.id === selectedQuestion.id ? newQuestion : question
      );
      setQuestions(updatedQuestions);
    } else {
      // Adding a new question
      setQuestions([...questions, newQuestion]);
    }
    closeModal();
  };

  const handleBankSave = (items) => {
    console.log(items)
    closeBankModal()
  }

  return (
    questions && (
      <div className="m-5">
        <div style={{ margin: '20px' }}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="body1">
              Trang chủ {'>'} Quản lý khóa học {'>'} Khóa học {courseId} {'>'} Khung chương trình {syllabusId} {'>'} Bài học {lessonId} {'>'} Tạo quiz
            </Typography>
            {/* <div style={{ marginTop: '20px' }}>
              <TextField label="Tên giảng viên:" InputProps={{ readOnly: true }} />
              <TextField label="Môn học:" style={{ marginLeft: '20px' }} InputProps={{ readOnly: true }} />
              <TextField label="Khóa học:" style={{ marginLeft: '20px' }} InputProps={{ readOnly: true }} />
              <TextField label="Ngày học:" style={{ marginLeft: '20px' }} InputProps={{ readOnly: true }} />

            </div>

            <div style={{ marginTop: '20px', display: 'block' }}>
              <TextField label="Thời gian làm bài:" /><br />
              <TextField label="Số lần làm bài:" style={{ marginTop: '20px' }} /><br />
              <TextField label="Tỉ trọng:" style={{ marginTop: '20px' }} /><br />
            </div> */}
            <div style={{ marginTop: '20px' }}>
              <Button variant="outlined" onClick={() => openModal(null)}>
                Tạo mới
              </Button>
              <Button variant="outlined" className='mx-3' onClick={openBankModal}>
                Thêm từ ngân hàng câu hỏi
              </Button>
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell >Nội dung câu hỏi</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question, index) => (
                  <TableRow key={question.id}>
                    <TableCell>{index++}</TableCell>
                    <TableCell>{question.content}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => openModal(question)}>Chi tiết</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>

        {/* Question Model */}
        {/* <QuestionModel
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          onUpdate={handleSave}
          question={selectedQuestion} // Pass the selected question for editing
        />

        <QuestionBankModal
          isOpen={isBankModalOpen}
          onClose={closeBankModal}
          onSave={handleBankSave}
        /> */}
      </div>
    )
  );
}
