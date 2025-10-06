"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { 
  X, 
  Plus, 
  Upload,
  Activity,
  Clock,
  Users,
  Star,
  MapPin,
  Waves,
  Mountain,
  TreePine,
  Camera,
  Gamepad2,
  Utensils,
  Heart,
  Zap
} from "lucide-react";
import { Activity as ActivityType } from "@/redux/apis/activityApi";

const iconOptions = [
  { value: "Activity", label: "Activity", icon: <Activity className="w-4 h-4" /> },
  { value: "Clock", label: "Clock", icon: <Clock className="w-4 h-4" /> },
  { value: "Users", label: "Users", icon: <Users className="w-4 h-4" /> },
  { value: "Star", label: "Star", icon: <Star className="w-4 h-4" /> },
  { value: "MapPin", label: "Map Pin", icon: <MapPin className="w-4 h-4" /> },
  { value: "Waves", label: "Waves", icon: <Waves className="w-4 h-4" /> },
  { value: "Mountain", label: "Mountain", icon: <Mountain className="w-4 h-4" /> },
  { value: "TreePine", label: "Tree Pine", icon: <TreePine className="w-4 h-4" /> },
  { value: "Camera", label: "Camera", icon: <Camera className="w-4 h-4" /> },
  { value: "Gamepad2", label: "Gamepad", icon: <Gamepad2 className="w-4 h-4" /> },
  { value: "Utensils", label: "Utensils", icon: <Utensils className="w-4 h-4" /> },
  { value: "Heart", label: "Heart", icon: <Heart className="w-4 h-4" /> },
  { value: "Zap", label: "Zap", icon: <Zap className="w-4 h-4" /> },
];

const categoryOptions = [
  "Adventure Sports",
  "Water Activities",
  "Nature & Wildlife",
  "Cultural Experiences",
  "Wellness & Spa",
  "Dining & Entertainment",
  "Family Activities",
  "Educational Tours",
  "Photography",
  "Fitness & Sports"
];

const difficultyOptions = [
  { value: "Easy", label: "Easy", color: "bg-green-100 text-green-800" },
  { value: "Medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "Hard", label: "Hard", color: "bg-red-100 text-red-800" },
];

interface ActivityFormProps {
  activity?: ActivityType | null;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ActivityForm({ activity, onSubmit, onCancel, isLoading }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    category: "",
    duration: "",
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    ageGroup: "",
    features: [] as string[],
    rating: "",
    icon: "Activity",
    order: 0,
    isActive: true,
  });
  const [featureInput, setFeatureInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        description: activity.description,
        detailedDescription: activity.detailedDescription,
        category: activity.category,
        duration: activity.duration,
        difficulty: activity.difficulty,
        ageGroup: activity.ageGroup,
        features: activity.features,
        rating: activity.rating?.toString() || "",
        icon: activity.icon,
        order: activity.order,
        isActive: activity.isActive,
      });
      setImagePreview(activity.image.url);
    }
  }, [activity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: imageFile,
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : <Activity className="w-4 h-4" />;
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {activity ? "Edit Activity" : "Add New Activity"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="detailedDescription">Detailed Description</Label>
                    <Textarea
                      id="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData((p) => ({ ...p, detailedDescription: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((p) => ({ ...p, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                        placeholder="e.g., 2 hours, Half day"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value: "Easy" | "Medium" | "Hard") => setFormData((p) => ({ ...p, difficulty: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficultyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ageGroup">Age Group</Label>
                      <Input
                        id="ageGroup"
                        value={formData.ageGroup}
                        onChange={(e) => setFormData((p) => ({ ...p, ageGroup: e.target.value }))}
                        placeholder="e.g., 5-12 years, All ages"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData((p) => ({ ...p, rating: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="order">Display Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData((p) => ({ ...p, order: parseInt(e.target.value || "0", 10) }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData((p) => ({ ...p, icon: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              {option.icon}
                              <span className="ml-2">{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData((p) => ({ ...p, isActive: checked }))}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Add a feature"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddFeature} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, i) => (
                      <Badge key={`${feature}-${i}`} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(i)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload an image for this activity
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="max-w-xs mx-auto"
                    />
                  </div>

                  {imagePreview && (
                    <div className="mt-4">
                      <Label>Preview</Label>
                      <div className="mt-2">
                        <ImageWithFallback
                          src={imagePreview}
                          alt="Preview"
                          width={200}
                          height={150}
                          className="rounded-lg border object-cover"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activity Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      {getIconComponent(formData.icon)}
                      <h3 className="font-semibold">{formData.title || "Activity Title"}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formData.description || "Activity description"}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">{formData.category || "Category"}</Badge>
                      <Badge className={difficultyOptions.find(d => d.value === formData.difficulty)?.color}>
                        {formData.difficulty}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Duration: {formData.duration || "Not specified"}</div>
                      <div>Age Group: {formData.ageGroup || "Not specified"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : activity ? "Update Activity" : "Create Activity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
