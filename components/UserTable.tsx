"use client";
import React, { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useDeleteUser } from "@/hooks/useDeleteUser";

// 🔹 تعريف User
interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  country: string;
}

type SearchableKeys = "username" | "fullName" | "email" | "country";

export default function UserTable() {
  const { users, loading, error, refetch } = useUsers();
  const { deleteUser } = useDeleteUser();

  const [searchBy, setSearchBy] = useState<SearchableKeys | "">("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    userId: string | null;
  }>({ visible: false, x: 0, y: 0, userId: null });

  const [mobileMenuId, setMobileMenuId] = useState<string | null>(null);

  // 🔹 فلترة المستخدمين
  const filteredUsers = users.filter((u: User) => {
    if (!searchBy || !search) return true;
    return u[searchBy].toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleRightClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    userId: string
  ) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, userId });
  };

  const handleCloseMenu = () => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
    setMobileMenuId(null);
  };

  const handleDelete = async (userId: string) => {
    if (userId) {
      await deleteUser(userId);
      refetch();
    }
    handleCloseMenu();
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">
        ⏳ جاري تحميل المستخدمين...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-10 p-4" onClick={handleCloseMenu}>
      <h3 className="text-4xl text-[#1E9CE0] font-bold text-center mb-6">
        الأعضاء
      </h3>

      {/* 🔹 البحث */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="border rounded-lg p-2 focus:ring-2 text-gray-700"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as SearchableKeys | "")}
        >
          <option value="">ابحث بواسطة...</option>
          <option value="username">اسم المستخدم</option>
          <option value="fullName">الاسم بالكامل</option>
          <option value="email">البريد الإلكتروني</option>
          <option value="country">الدولة</option>
        </select>

        <input
          type="text"
          className="flex-1 border rounded-lg p-2 focus:ring-2 text-gray-700"
          placeholder={`ادخل ${searchBy || "القيمة"}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={!searchBy}
        />
      </div>

      {/* 🔹 الجدول */}
      {displayedUsers.length === 0 ? (
        <p className="text-center text-gray-500">🚫 لا يوجد مستخدمين.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full border-collapse text-right text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">م</th>
                <th className="p-3 border">الاسم بالكامل</th>
                <th className="p-3 border">اسم المستخدم</th>
                <th className="p-3 border">البريد الإلكتروني</th>
                <th className="p-3 border">الدولة</th>
                <th className="p-3 border md:hidden text-center">⋮</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((u, i) => (
                <tr
                  key={u.id}
                  onContextMenu={(e) => handleRightClick(e, u.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-3 border text-center">
                    {i + 1 + (currentPage - 1) * usersPerPage}
                  </td>
                  <td className="p-3 border">{u.fullName}</td>
                  <td className="p-3 border">{u.username}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border">{u.country}</td>
                  {/* زر ⋮ للشاشات الصغيرة */}
                  <td className="p-3 border md:hidden text-center relative">
                    <button
                      className="px-2 text-gray-600 hover:text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuId(mobileMenuId === u.id ? null : u.id);
                      }}
                    >
                      ⋮
                    </button>
                    {mobileMenuId === u.id && (
  <ul className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg border w-64 z-50">
    <li
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 text-center"
      onClick={() => handleDelete(u.id)}
    >
      🗑️ حذف المستخدم
    </li>
  </ul>
)}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <ul className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p}>
                <button
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === p
                      ? "bg-[#1E9CE0] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 Context Menu للشاشات الكبيرة */}
      {contextMenu.visible && (
        <ul
          className="absolute bg-white shadow-lg rounded-lg border w-44 z-50 hidden md:block"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleDelete(contextMenu.userId!)}
          >
            🗑️ حذف المستخدم
          </li>
        </ul>
      )}
    </div>
  );
}
