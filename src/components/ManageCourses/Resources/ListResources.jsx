import { Button, InputBase, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import TextTruncate from '../../../util/Text-Truncate/TextTruncate';
import { Search } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import ResourceModal from './ResourceModal';

const ListResources = () => {
    const { courseId, syllabusId, lessonId } = useParams();
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(null);


    const handleSearchChange = (event) => {
        const searchInput = event.target.value;
        setSearchValue(searchInput);
        // Refilter the data when search input changes
        filterData(searchInput);
    };

    const filterData = (searchInput) => {
        // Filter data based on both status and search input
        const filteredData = data.filter((item) => {
            const searchMatch =
                searchInput === '' ||
                item.content.toLowerCase().includes(searchInput.toLowerCase());
            return searchMatch;
        });

        setSearchData(filteredData);
    }

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            fetchData(`/resource/by-lesson?lesson_id=${lessonId}`, token).then(resp => {
                if (resp) {
                    setData(resp)
                }
            })
        }
    }, [])

    const handleAddResource = async (name, url) => {
        const token = Cookies.get('token')
        if (token) {
            const body = { name: name, content: url, resourceType: 'file', lessonId: lessonId }
            await postData(`/resource/save`, body, token).then(resp => {
                if (resp) {
                    window.location.reload()
                }
            })
        }
    }

    return (
        <div className="m-1">
            <div style={{ margin: '20px' }}>
                <Paper style={{ padding: '20px' }}>
                    <Typography variant="body1" style={{ color: 'darkblue' }}>
                        <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link> {'>'}
                        <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}> Khung chương trình {syllabusId}</Link> {'>'} Bài học {lessonId} {'>'} tài nguyên
                    </Typography>

                    {/* <div style={{ marginTop: '20px' }}>
                        <TextField label="Ngày tạo:" value={syllabus.createDate} />
                        <TextField label="Trạng thái:" style={{ marginLeft: '20px' }} value={syllabus.status} />

                        <Button variant="outlined" style={{ marginLeft: '20px' }} onClick={handleEditSyllabusClick}>
                            Chỉnh sửa
                        </Button>
                    </div> */}

                    <div
                        style={{ marginTop: '20px' }}
                        className="d-flex align-items-center"
                    >
                        <Typography variant="h6">Danh sách tài nguyên</Typography>
                        <InputBase
                            placeholder="Search name"
                            style={{ marginLeft: '20px' }}
                            startAdornment={<Search />}
                            onChange={handleSearchChange}
                        />
                        <div className="text-end col-8">

                            <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => setIsResourceModalOpen(true)}>
                                Tạo mới
                            </Button>
                        </div>
                    </div>

                    <Table style={{ marginTop: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Nội dung</TableCell>
                                <TableCell>Loại tài nguyên</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchData ? searchData.map((l, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{l.content.startsWith('https') ?
                                            <a href={l.content} target="_blank" rel="noopener noreferrer">
                                                <TextTruncate text={l.name} />
                                            </a> : <TextTruncate text={l.name} />
                                        }</TableCell>

                                        <TableCell><TextTruncate text={l.resourceType} /></TableCell>
                                    </TableRow>
                                );
                            }) :
                                data && data.length > 0 && data.map((l, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{l.content.startsWith('https') ?
                                                <a href={l.content} target="_blank" rel="noopener noreferrer">
                                                    <TextTruncate text={l.name} />
                                                </a> : <TextTruncate text={l.name} />
                                            }</TableCell>

                                            <TableCell><TextTruncate text={l.resourceType} /></TableCell>
                                        </TableRow>

                                    )
                                })}
                        </TableBody>
                    </Table>
                    <ResourceModal isOpen={isResourceModalOpen} onClose={() => setIsResourceModalOpen(false)} onSave={handleAddResource} />
                </Paper>
            </div>
        </div>
    )
}

export default ListResources
