"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useGetAdventureActivitiesQuery, useCreateAdventureActivityMutation, useUpdateAdventureActivityMutation, useDeleteAdventureActivityMutation, useToggleAdventureActivityStatusMutation } from "@/redux/apis/adventureActivityApi";
import { AdventureActivity } from "@/redux/apis/adventureActivityApi";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  Gamepad2,
  Mountain,
  Waves,
  Baby,
  Activity,
  Loader2
} from "lucide-react";

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Gamepad2: <Gamepad2 className="w-4 h-4" />,
    Mountain: <Mountain className="w-4 h-4" />,
    Waves: <Waves className="w-4 h-4" />,
    Baby: <Baby className="w-4 h-4" />,
    Activity: <Activity className="w-4 h-4" />,
  };
  return iconMap[iconName] || <Activity className="w-4 h-4" />;
};

export function AdventureActivityManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<AdventureActivity | null>(null);
  const [deletingActivityId, setDeletingActivityId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    detailedDescription: "",
    category: "indoor",
    ageGroup: "all-ages",
    difficulty: "easy",
    timing: "all-day",
    duration: "",
    capacity: "",
    highlights: "",
    icon: "Activity",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // API hooks
  const { data: activitiesResponse, isLoading, error } = useGetAdventureActivitiesQuery({});
  const [createActivity, { isLoading: isCreating }] = useCreateAdventureActivityMutation();
  const [updateActivity, { isLoading: isUpdating }] = useUpdateAdventureActivityMutation();
  const [deleteActivity, { isLoading: isDeleting }] = useDeleteAdventureActivityMutation();
  const [toggleStatus] = useToggleAdventureActivityStatusMutation();

  const activities = activitiesResponse?.data || [];

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this activity? This action cannot be undone.")) {
      try {
        setDeletingActivityId(id);
        await deleteActivity(id).unwrap();
        setDeletingActivityId(null);
      } catch (error) {
        console.error("Failed to delete activity:", error);
        alert("Failed to delete activity. Please try again.");
        setDeletingActivityId(null);
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
    } catch (error) {
      console.error("Failed to toggle activity status:", error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-700 border-green-200";
      case "moderate": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "indoor": return "bg-blue-100 text-blue-700 border-blue-200";
      case "outdoor": return "bg-green-100 text-green-700 border-green-200";
      case "water": return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "kids": return "bg-pink-100 text-pink-700 border-pink-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      detailedDescription: "",
      category: "indoor",
      ageGroup: "all-ages",
      difficulty: "easy",
      timing: "all-day",
      duration: "",
      capacity: "",
      highlights: "",
      icon: "Activity",
      order: 0,
      isActive: true,
    });
    setImageFile(null);
    setEditingActivity(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load activities</p>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Adventure Activities Management</h2>
          <p className="text-gray-600">Manage all adventure activities and their details</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New Activity
        </Button>
      </div>

     

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <motion.div
            key={activity._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={activity.image?.url || "/placeholder-activity.jpg"}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    {getIconComponent(activity.icon)}
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={getDifficultyColor(activity.difficulty)}>
                    {activity.difficulty}
                  </Badge>
                  <Badge className={getCategoryColor(activity.category)}>
                    {activity.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant={activity.isActive ? "default" : "secondary"}>
                    {activity.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {activity.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {activity.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{activity.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-medium">{activity.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Age Group:</span>
                    <span className="font-medium">{activity.ageGroup}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                  onClick={() => {
                    setEditingActivity(activity);
                    setForm({
                      name: activity.name,
                      description: activity.description,
                      detailedDescription: activity.detailedDescription,
                      category: activity.category,
                      ageGroup: activity.ageGroup,
                      difficulty: activity.difficulty,
                      timing: activity.timing,
                      duration: activity.duration,
                      capacity: activity.capacity,
                      highlights: activity.highlights.join(', '),
                      icon: activity.icon,
                      order: activity.order,
                      isActive: activity.isActive,
                    });
                  }}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(activity._id)}
                  >
                    {activity.isActive ? (
                      <EyeOff className="w-4 h-4 mr-1" />
                    ) : (
                      <Eye className="w-4 h-4 mr-1" />
                    )}
                    {activity.isActive ? "Hide" : "Show"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(activity._id)}
                    disabled={deletingActivityId === activity._id}
                    className="col-span-1 sm:col-span-2 lg:col-span-1"
                  >
                    {deletingActivityId === activity._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    {deletingActivityId === activity._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <Button onClick={() => {
            setSearchTerm("");
            setCategoryFilter("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || !!editingActivity} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setEditingActivity(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingActivity ? "Edit Activity" : "Create New Activity"}
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (editingActivity) {
                  const payload: any = {
                    id: editingActivity._id,
                    name: form.name,
                    description: form.description,
                    detailedDescription: form.detailedDescription,
                    category: form.category as any,
                    ageGroup: form.ageGroup as any,
                    difficulty: form.difficulty as any,
                    timing: form.timing as any,
                    duration: form.duration,
                    capacity: form.capacity,
                    icon: form.icon,
                    order: form.order,
                    isActive: form.isActive,
                    highlights: form.highlights
                      .split(',')
                      .map((h) => h.trim())
                      .filter(Boolean),
                  };
                  if (imageFile) payload.image = imageFile;
                  await updateActivity(payload).unwrap();
                } else {
                  const payload: any = {
                    name: form.name,
                    description: form.description,
                    detailedDescription: form.detailedDescription,
                    category: form.category as any,
                    ageGroup: form.ageGroup as any,
                    difficulty: form.difficulty as any,
                    timing: form.timing as any,
                    duration: form.duration,
                    capacity: form.capacity,
                    icon: form.icon,
                    order: form.order,
                    isActive: form.isActive,
                    image: imageFile!,
                    highlights: form.highlights
                      .split(',')
                      .map((h) => h.trim())
                      .filter(Boolean),
                  };
                  await createActivity(payload).unwrap();
                }
                resetForm();
                setIsCreateDialogOpen(false);
                setEditingActivity(null);
              } catch (err) {
                console.error('Save failed', err);
              }
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e)=>setForm(p=>({...p,name:e.target.value}))} required />
              </div>
              <div>
                <Label>Category</Label>
                <Select
  value={form.category}
  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
>
  <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400">
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-50">
    <SelectItem value="indoor">Indoor</SelectItem>
    <SelectItem value="outdoor">Outdoor</SelectItem>
    <SelectItem value="water">Water</SelectItem>
    <SelectItem value="kids">Kids</SelectItem>
  </SelectContent>
</Select>

              </div>
              <div className="sm:col-span-2">
                <Label>Short Description</Label>
                <Textarea rows={2} value={form.description} onChange={(e)=>setForm(p=>({...p,description:e.target.value}))} required />
              </div>
              <div className="sm:col-span-2">
                <Label>Detailed Description</Label>
                <Textarea rows={4} value={form.detailedDescription} onChange={(e)=>setForm(p=>({...p,detailedDescription:e.target.value}))} required />
              </div>
              <div>
                <Label>Age Group</Label>
                <Select value={form.ageGroup} onValueChange={(v)=>setForm(p=>({...p,ageGroup:v}))}>
  <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400">
    <SelectValue placeholder="Select age group" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
    <SelectItem value="kids">Kids</SelectItem>
    <SelectItem value="teens-adults">Teens & Adults</SelectItem>
    <SelectItem value="kids-adults">Kids & Adults</SelectItem>
    <SelectItem value="all-ages">All Ages</SelectItem>
  </SelectContent>
</Select>

              </div>
              <div>
                <Label>Difficulty</Label>
                <Select value={form.difficulty} onValueChange={(v)=>setForm(p=>({...p,difficulty:v}))}>
  <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400">
    <SelectValue placeholder="Select difficulty" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
    <SelectItem value="easy">Easy</SelectItem>
    <SelectItem value="moderate">Moderate</SelectItem>
    <SelectItem value="hard">Hard</SelectItem>
  </SelectContent>
</Select>

              </div>
              <div>
                <Label>Timing</Label>
                <Select value={form.timing} onValueChange={(v)=>setForm(p=>({...p,timing:v}))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-day">All Day</SelectItem>
                    <SelectItem value="morning-evening">Morning & Evening</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration</Label>
                <Input value={form.duration} onChange={(e)=>setForm(p=>({...p,duration:e.target.value}))} />
              </div>
              <div>
                <Label>Capacity</Label>
                <Input value={form.capacity} onChange={(e)=>setForm(p=>({...p,capacity:e.target.value}))} />
              </div>
              <div className="sm:col-span-2">
                <Label>Highlights (comma separated)</Label>
                <Input value={form.highlights} onChange={(e)=>setForm(p=>({...p,highlights:e.target.value}))} />
              </div>
              <div>
                <Label>Icon</Label>
                <Input value={form.icon} onChange={(e)=>setForm(p=>({...p,icon:e.target.value}))} />
              </div>
              <div>
                <Label>Order</Label>
                <Input type="number" value={form.order} onChange={(e)=>setForm(p=>({...p,order:parseInt(e.target.value||'0',10)}))} />
              </div>
              <div className="sm:col-span-2">
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files?.[0]||null)} />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input id="isActive" type="checkbox" checked={form.isActive} onChange={(e)=>setForm(p=>({...p,isActive:e.target.checked}))} />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
  <Button
    type="button"
    variant="outline"
    onClick={() => {
      resetForm();
      setIsCreateDialogOpen(false);
      setEditingActivity(null);
    }}
    disabled={isCreating || isUpdating} // disable cancel during request
  >
    Cancel
  </Button>

  <Button type="submit" disabled={isCreating || isUpdating}>
    {(isCreating || isUpdating) && (
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    )}
    {editingActivity ? "Update" : "Create"}
  </Button>
</div>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
