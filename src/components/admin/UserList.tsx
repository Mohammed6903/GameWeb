import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onPromote: (id: string) => void;
}

export function UserList({ users, currentPage, totalPages, onPageChange, onDelete, onPromote }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [promotingUserId, setPromotingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null); // State for delete dialog

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePromoteClick = (id: string) => {
    setPromotingUserId(id);
  };

  const handleConfirmPromote = () => {
    if (promotingUserId !== null) {
      onPromote(promotingUserId);
      setPromotingUserId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingUserId(id);
  };

  const handleConfirmDelete = () => {
    if (deletingUserId !== null) {
      onDelete(deletingUserId); // Trigger onDelete function
      setDeletingUserId(null); // Close the delete dialog
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-gray-300"
        />
        <Button variant="outline" className="text-gray-700 border-gray-300">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-gray-700">Email</TableHead>
              <TableHead className="text-gray-700">Role</TableHead>
              <TableHead className="text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="text-gray-700">{user.email}</TableCell>
                <TableCell className="text-gray-700">{user.role}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.role !== "admin" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePromoteClick(user.id)}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    )}
                    {(user.role !== 'admin') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(user.id)} // Trigger delete dialog
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          className="text-gray-700 border-gray-300"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          className="text-gray-700 border-gray-300"
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Promote user dialog */}
      <AlertDialog open={promotingUserId !== null} onOpenChange={() => setPromotingUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promote User to Admin</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to promote this user to Admin? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPromote}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete user dialog */}
      <AlertDialog open={deletingUserId !== null} onOpenChange={() => setDeletingUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}