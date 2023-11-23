import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  TextareaAutosize,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from '@material-ui/core';
import ReportReasonModal from './ReportFeedbackModal'; // Import the ReportReasonModal component
import { useEffect } from 'react';
import { rating } from '../../../../util/Constants';

export default function FeedbackModal({ open, onClose, data }) {
  const [isReportReasonModalOpen, setReportReasonModalOpen] = useState(false);

  const handleBaoCaoClick = () => {
    // Open the 'Lí do' modal
    setReportReasonModalOpen(true);
  };

  const handleReportReasonClose = () => {
    // Close the 'Lí do' modal
    setReportReasonModalOpen(false);
  };

  const handleReportReasonComplete = (reason) => {
    // Handle the 'Hoàn thành' action for 'Lí do' here
    // You can store the reason or perform any required action
    console.log(reason);
    console.log(data);
    // Close the 'Lí do' modal
    setReportReasonModalOpen(false);
    onClose();
  };

  return (
    data && (
      <>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Nhận xét</DialogTitle>
          <DialogContent>
            <Paper style={{ padding: '20px', width: '30rem', margin: '0 auto' }}>
              {data.feedbackDetails &&
                data.feedbackDetails.map((question, index) => {
                  if (question?.type === 'TEXT') {
                    return (
                      <TextareaAutosize
                        style={{ width: '100%', marginBottom: '20px' }}
                        rowsMin={6}
                        placeholder=""
                        value={question?.text}
                      />
                    );
                  } else {
                    return (
                      <div key={question} style={{ marginBottom: '20px' }}>
                        <Typography variant="body1" gutterBottom>
                          Câu hỏi: {question?.feedContent.content}
                        </Typography>
                        {rating.map((r) => (
                          <FormControlLabel
                            key={index}
                            control={<Radio color="primary" />}
                            label={r?.label}
                            style={{ margin: '0 10px 0 0' }}
                            disabled
                            checked={r.rate == question.rate}
                          />
                        ))}
                      </div>
                    );
                  }
                })}

              <Button
                variant="outlined"
                onClick={handleBaoCaoClick} // Open the 'Lí do' modal
                style={{ marginLeft: '10px' }}
              >
                Báo cáo
              </Button>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="outlined">
              Hủy
            </Button>
            {/* ... (Other actions) ... */}
          </DialogActions>
        </Dialog>

        {/* Render the 'Lí do' modal */}
        <ReportReasonModal
          open={isReportReasonModalOpen}
          onClose={handleReportReasonClose}
          onComplete={handleReportReasonComplete}
        />
      </>
    )
  );
}
