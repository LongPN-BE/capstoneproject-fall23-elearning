import { useEffect, useState } from 'react';
import ViewConfig from './ViewConfig';

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
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import ConfigModal from './ConfigModal';

export default function ListConfig() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configToEdit, setConfigToEdit] = useState(null);
  const [isViewConfigModalOpen, setIsViewConfigModalOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/system-config/configs', token).then((resp) => {
          if (resp) {
            setData(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleAddConfig = () => {
    setConfigToEdit(null); // Clear any previous config data (for editing)
    setIsConfigModalOpen(true);
  };

  const handleViewConfig = (configData) => {
    console.log(configData);
    setConfigToEdit(configData); // Set the config data to edit
    setIsViewConfigModalOpen(true);
  };

  const handleConfigModalClose = () => {
    setIsConfigModalOpen(false);
  };

  const handleViewConfigModalClose = () => {
    setIsViewConfigModalOpen(false);
  };

  const saveOrUpdateConfig = async (configData) => {
    const token = Cookies.get('token');
    console.log('Config data to save or update:', configData);
    // If setIsConfigModalOpen has an "id", it means you are updating an existing config.
    // Implement your create logic here for new config.
    console.log('Config data to create:', configData);
    const body = {
      ...configData,
      dateTime: moment(new Date()),
    };
    console.log('Config data to update:', await body);
    await postData('/system-config/save', body, token)
      .then((resp) => {
        if (resp) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsConfigModalOpen(false); // Close the ConfigModal
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    // Refilter the data when search input changes
    filterData(searchInput);
  };

  const filterData = (searchInput) => {
    // Filter data based on both status and search input
    const filteredData = data.filter((item) => {
      const searchMatch = searchInput === '' || item.name.toLowerCase().includes(searchInput.toLowerCase());
      return searchMatch;
    });

    setData(filteredData);
  };

  return (
    data && (
      <div className="m-5">
        <div style={{ margin: '20px' }}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="body1">Trang chủ {'>'} Quản lý cấu hình</Typography>

            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <Typography variant="subtitle1">Lịch sử cấu hình</Typography>

              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
              <div className="text-end col-8">
                <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleAddConfig}>
                  Cập nhật
                </Button>
              </div>
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Phiên bản</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((c, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{c.version}</TableCell>
                      <TableCell>{c.projectName}</TableCell>
                      <TableCell>{c.dateCreate}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewConfig(c)}
                          className="m-1 p-0"
                        >
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <ConfigModal
          isOpen={isConfigModalOpen}
          onSave={saveOrUpdateConfig}
          onUpdate={saveOrUpdateConfig}
          onClose={handleConfigModalClose}
          config={configToEdit !== null ? configToEdit : null}
        />
        <ViewConfig
          isOpen={isViewConfigModalOpen}
          onSave={saveOrUpdateConfig}
          onUpdate={saveOrUpdateConfig}
          onClose={handleViewConfigModalClose}
          config={configToEdit !== null ? configToEdit : null}
        />
      </div>
    )
  );
}
