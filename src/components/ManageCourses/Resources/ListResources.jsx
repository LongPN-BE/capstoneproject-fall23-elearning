import { Button, InputBase, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import TextTruncate from '../../../util/Text-Truncate/TextTruncate';
import { Search } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import ResourceModal from './ResourceModal';
import CustomBreadcrumbs from '../../Breadcrumbs';

const ListResources = () => {
    const { courseId, syllabusId, lessonId } = useParams();
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [course, setCourse] = useState()
    const [syllabus, setSyllabus] = useState()
    const [lesson, setLesson] = useState()

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
            fetchData(`/course/byId?id=${courseId}`, token).then(resp => {
                if (resp) {
                    setCourse(resp)
                }
            })
            fetchData(`/syllabus/byId?id=${syllabusId}`, token).then(resp => {
                if (resp) {
                    setSyllabus(resp)
                }
            })
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

    // State to keep track of the current page and the number of rows per page
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Change the number of rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = searchData ? page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchData.length) : 0 : page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const breadcrumbItems = [
        {
            url: '/',
            label: 'Trang chủ',
        },
        {
            url: `/manage-course`,
            label: `Quản lý khóa học`,
        },
        {
            url: `/courses/` + courseId,
            label: course?.name,
        },
        {
            url: `/courses/` + courseId + `/syllabus/` + syllabusId,
            label: syllabus?.name,
        },
        {
            url: `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId,
            label: 'Tài nguyên',
        },
    ];

    return (
        <div className="m-1">
            <div style={{ margin: '20px' }}>
                <Paper style={{ padding: '20px' }}>
                    {/* <Typography variant="body1" style={{ color: 'darkblue' }}>
                        <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link> {'>'}
                        <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}> Khung chương trình {syllabusId}</Link> {'>'} Bài học {lessonId} {'>'} tài nguyên
                    </Typography> */}
                    <CustomBreadcrumbs items={breadcrumbItems} />
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
                        {(course?.status !== 'ACTIVE' && course?.status !== 'PENDING') && <div className="text-end col-8">
                            <button className='btn btn-success' style={{ marginLeft: '10px' }} onClick={() => setIsResourceModalOpen(true)}>
                                Tạo mới
                            </button>
                        </div>}
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
                            {searchData ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => {
                                return (
                                    <>
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{l.content.startsWith('https') ?
                                                <a href={l.content} target="_blank" rel="noopener noreferrer">
                                                    <TextTruncate text={l.name} />
                                                </a> : <TextTruncate text={l.name} />
                                            }</TableCell>

                                            <TableCell><TextTruncate text={l.resourceType} /></TableCell>
                                        </TableRow>
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </>

                                );
                            }) :
                                data && data.length > 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => {
                                    return (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{l.content.startsWith('https') ?
                                                    <a href={l.content} target="_blank" rel="noopener noreferrer">
                                                        <TextTruncate text={l.name} />
                                                    </a> : <TextTruncate text={l.name} />
                                                }</TableCell>

                                                <TableCell><TextTruncate text={l.resourceType} /></TableCell>
                                            </TableRow>

                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </>

                                    )
                                })}
                        </TableBody>
                    </Table>
                    {data && searchData && <TablePagination
                        labelRowsPerPage="Số hàng trên trang :"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={searchData ? searchData.length : data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
                    <ResourceModal isOpen={isResourceModalOpen} onClose={() => setIsResourceModalOpen(false)} onSave={handleAddResource} />
                </Paper>
            </div>
        </div>
    )
}

export default ListResources
