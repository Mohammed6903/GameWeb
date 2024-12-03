"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Settings
      </h1>

      {/* General Settings */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="site-title">Site Title</Label>
            <Input id="site-title" placeholder="Enter your site title" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="site-email">Contact Email</Label>
            <Input id="site-email" placeholder="Enter your contact email" />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Add, edit, or remove users with administrative access.
          </p>
          <div className="flex space-x-4">
            <Button variant="outline">Add New Admin</Button>
            <Button variant="outline">View All Users</Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Customization */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Theme Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Dark Mode</Label>
            <Switch />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <Input id="primary-color" type="color" />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Save Theme
          </Button>
        </CardContent>
      </Card>

      {/* System Logs */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Monitor recent activity and system performance.
          </p>
          <Button variant="outline">View Logs</Button>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
