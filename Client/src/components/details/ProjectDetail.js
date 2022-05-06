import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SlideProject from "./slide/SlideProject";
import { Grid, Typography } from "@mui/material";
import projectApi from "../../api/projectApi";
import moment from 'moment';
import LoadingScreen from "../LoandingScreen";

const StyleBox = styled(Box)({
    padding: '0 2vh',
    maxWidth: '120vh',
    margin: '1vh auto',
    backgroundColor: 'white',
    height: '50vh',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    flexDirection: 'colurmn',
    position: 'relative',
    zIndex: '100'
});

const StyleTitlePage = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

export default function ProjectDetail() {
    const [project, setProject] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await projectApi.getProject(pathname.split('/').pop());
                const { project, prevProject, nextProject } = response
                setProject({
                    current: project,
                    prevProject,
                    nextProject
                });

            } catch (error) {
                console.log('Failed to get project: ', error);
            }
        }

        getProject();
    }, [pathname]);

    console.log(project);

    function handleClick(projectCurrent) {
        if (projectCurrent == null) {
            return `/projects`
        }
        else {
            return `/projects/${projectCurrent.slug}`
        }
    }

    return (
        <>
            {project && (
                <>
                    <StyleBox>
                        <SlideProject images={project.current.images} />
                        <Typography className="section-title" sx={{ fontSize: '18px', height: 'auto', paddingTop: { xs: '10px', md: '2vh' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >
                            {project.current.name}
                        </Typography>
                        <Grid container
                            direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
                            sx={{
                                maxWidth: '120vh',

                            }}>
                            <Grid item xs={9.065}>


                                <div className="scrollbar scrollbar-detail" id="style-4">
                                    <div className="force-overflow">
                                        <Typography variant="p" sx={{ fontSize: '12px', color: '#6D6D6D', textAlign: 'justify', textJustify: 'distribute' }}>
                                            <div dangerouslySetInnerHTML={{ __html: `${project.current.description}` }} className="content-detail"></div>
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={2.935} sx={{
                                paddingLeft: { xs: '0', sm: '15px' }, 
                                marginTop: { xs: '0', sm: '-5px' }, 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                WebkitFlexBasis: 'auto',
                            }}>
                                <div class="sub-logo">
                                    <img style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDIH49FVMfYl1RyY51sGm_zUoPlwYVnQaYCgISEa9zJh3k4vq2zgRjwlir3wMkbyUnRyE&usqp=CAU"
                                        alt="Datos.png" />
                                </div>
                                <div>
                                    <Typography variant="p" sx={{  color: '#000000', fontSize: '10px' }}>
                                        Architect: {project.current.architect.name}
                                    </Typography>
                                    <br />
                                    <Typography variant="p" sx={{  color: '#000000', fontSize: '10px' }} >
                                        Position: {project.current.architect.name}
                                    </Typography>
                                    <br />
                                    <Typography variant="p" sx={{  color: '#000000', fontSize: '10px' }}>
                                        Time: {moment(project.current.createAt).format('DD/MM/YYYY')}
                                    </Typography>
                                    <br />
                                    <Typography variant="p" sx={{  color: '#000000', fontSize: '10px' }} >
                                        Completion Time: {project.current.architect.name}
                                    </Typography>
                                </div>

                            </Grid>
                        </Grid>

                        <Box sx={{ paddingTop: { xs: '0' } }} >
                            <div className='pagination'>
                                {project.prevProject && (
                                    <a
                                        className="button-transfer-page"
                                        href={handleClick(project.prevProject)}
                                    >
                                        P R E V
                                        <br />
                                        <StyleTitlePage className="button-transfer-page-title">
                                            {project.prevProject.name}
                                        </StyleTitlePage>
                                    </a>
                                )}
                                {!project.prevProject && (
                                    <button className="button-transfer-page" disabled={true}></button>
                                )}
                                {project.nextProject && (
                                    <a
                                        className="button-transfer-page button-next"
                                        href={handleClick(project.nextProject)}
                                    >
                                        N E X T
                                        <br />
                                        <StyleTitlePage className="button-transfer-page-title">
                                            {project.nextProject.name}
                                        </StyleTitlePage>
                                    </a>
                                )}
                                {!project.nextProject && (
                                    <button className="button-transfer-page button-next" disabled={true}></button>
                                )}
                            </div>
                        </Box>

                    </StyleBox>


                </>
            )
            }
            {!project && (<LoadingScreen />)}
        </>
    )
}