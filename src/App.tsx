import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ReferenceTablesList } from "./screens/ReferenceTablesList";
import { ReferenceTableDetail } from "./screens/ReferenceTableDetail";
import { ReferenceTableAdminEdit } from "./screens/ReferenceTableAdminEdit";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/reference-tables" replace />} />
        <Route path="/reference-tables" element={<ReferenceTablesList />} />
        <Route path="/reference-tables/:id" element={<ReferenceTableDetail />} />
        <Route path="/admin/reference-tables/:id/edit" element={<ReferenceTableAdminEdit />} />
      </Routes>
    </AppLayout>
  );
}
