import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { NoteFormPage } from "./pages/NoteFormPage";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";
import { NoteProvider } from "./context/notesContext";

function App() {
    return (
        <div className="mycontainer">
            <AuthProvider>
                <NoteProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/notes" element={<NotesPage />} />
                                <Route
                                    path="/add-note"
                                    element={<NoteFormPage />}
                                />
                                <Route
                                    path="/notes/:id"
                                    element={<NoteFormPage />}
                                />
                                <Route
                                    path="/profile"
                                    element={<h1>Profile</h1>}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </NoteProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
