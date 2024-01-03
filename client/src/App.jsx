import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute, RoleProtectedRoute } from "./routes";
import { HomePage } from "./pages/home/HomePage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { NoteFormPage } from "./pages/notes/NoteFormPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { NotesPage } from "./pages/notes/NotesPage";
import { NoteProvider } from "./context/notesContext";
import { VideoProvider } from "./context/videoContext";
import { UsersPage } from "./pages/users/UsersPage";
import { VideosPage } from "./pages/video/VideosPage";
import { VideoFormPage } from "./pages/video/VideoFormPage";
import { UsersProvider } from "./context/usersContext";
import { CoursesPage } from "./pages/course/CoursesPage.jsx";
import { CourseFormPage } from "./pages/course/CourseFormPage.jsx";
import { CourseView } from "./pages/course/CourseView.jsx";
import { CourseProvider } from "./context/courseContext.jsx";
import { CourseEditFormPage } from "./pages/course/CourseEditFormPage.jsx";

function App() {
    return (
        <div className="mycontainer">
            <AuthProvider>
                <CourseProvider>
                    <NoteProvider>
                        <VideoProvider>
                            <UsersProvider>
                                <BrowserRouter>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<HomePage />}
                                        />
                                        <Route
                                            path="/login"
                                            element={<LoginPage />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<RegisterPage />}
                                        />

                                        <Route element={<ProtectedRoute />}>
                                            <Route
                                                path="/notes"
                                                element={<NotesPage />}
                                            />
                                            <Route
                                                path="/courses"
                                                element={<CoursesPage />}
                                            />
                                            <Route
                                                path="/courses/add-course"
                                                element={<CourseFormPage />}
                                            />
                                            <Route
                                                path="/courses/edit-course/:id"
                                                element={<CourseEditFormPage />}
                                            />
                                            <Route
                                                path="/courses/:id"
                                                element={<CourseView />}
                                            />
                                            <Route
                                                path="/add-note"
                                                element={<NoteFormPage />}
                                            />
                                            <Route
                                                path="/notes/:id"
                                                element={<NoteFormPage />}
                                            />
                                        </Route>

                                        <Route element={<RoleProtectedRoute />}>
                                            <Route
                                                path="/admin/users"
                                                element={<UsersPage />}
                                            />
                                            <Route
                                                path="/admin/videos"
                                                element={<VideosPage />}
                                            />
                                            <Route
                                                path="/admin/add-video"
                                                element={<VideoFormPage />}
                                            />
                                            <Route
                                                path="/admin/videos/:id"
                                                element={<VideoFormPage />}
                                            />
                                        </Route>
                                    </Routes>
                                </BrowserRouter>
                            </UsersProvider>
                        </VideoProvider>
                    </NoteProvider>
                </CourseProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
