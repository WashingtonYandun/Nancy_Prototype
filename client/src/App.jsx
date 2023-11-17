import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute, RoleProtectedRoute } from "./routes";

import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { NoteFormPage } from "./pages/NoteFormPage";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";
import { NoteProvider } from "./context/notesContext";
import { VideoProvider } from "./context/videoContext";
import { UsersPage } from "./pages/admin/UsersPage";
import { VideosPage } from "./pages/admin/VideosPage";
import { VideoFormPage } from "./pages/admin/VideoFormPage";
import { UsersProvider } from "./context/usersContext";

function App() {
    return (
        <div className="mycontainer">
            <AuthProvider>
                <NoteProvider>
                    <VideoProvider>
                        <UsersProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
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
            </AuthProvider>
        </div>
    );
}

export default App;
