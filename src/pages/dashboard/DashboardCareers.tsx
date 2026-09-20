/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAdminCareers, useCreateCareer, useDeleteCareer, useUpdateCareer } from "@/hooks/useCareers";
import { format } from "date-fns";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const DashboardCareers = () => {
  const { data: careers, isLoading } = useAdminCareers();
  const createCareer = useCreateCareer();
  const updateCareer = useUpdateCareer();
  const deleteCareer = useDeleteCareer();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    type: "Full-time",
    location: "",
    about_the_role: "",
    short_term_goals: "",
    what_you_bring: "",
    why_you_might_love: "",
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      type: "Full-time",
      location: "",
      about_the_role: "",
      short_term_goals: "",
      what_you_bring: "",
      why_you_might_love: "",
      is_active: true,
    });
    setEditingCareer(null);
  };

  const handleSubmit = async () => {
    const careerData = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      type: formData.type,
      location: formData.location,
      about_the_role: formData.about_the_role.split("\n").filter(Boolean),
      short_term_goals: formData.short_term_goals.split("\n").filter(Boolean),
      what_you_bring: formData.what_you_bring.split("\n").filter(Boolean),
      why_you_might_love: formData.why_you_might_love.split("\n").filter(Boolean),
      is_active: formData.is_active,
    };

    if (editingCareer) {
      await updateCareer.mutateAsync({ id: editingCareer, updates: careerData });
    } else {
      await createCareer.mutateAsync(careerData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (career: any) => {
    setFormData({
      title: career.title,
      slug: career.slug,
      type: career.type,
      location: career.location,
      about_the_role: career.about_the_role.join("\n"),
      short_term_goals: career.short_term_goals.join("\n"),
      what_you_bring: career.what_you_bring.join("\n"),
      why_you_might_love: career.why_you_might_love.join("\n"),
      is_active: career.is_active,
    });
    setEditingCareer(career.id);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Career Openings</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }} >
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Position</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>{editingCareer ? "Edit" : "Add"} Career Opening</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="" />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="auto-generated" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Location *</label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">About the Role (one per line)</label>
                <Textarea value={formData.about_the_role} onChange={(e) => setFormData({ ...formData, about_the_role: e.target.value })} rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">Short Term Goals (one per line)</label>
                <Textarea value={formData.short_term_goals} onChange={(e) => setFormData({ ...formData, short_term_goals: e.target.value })} rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">What You Bring (one per line)</label>
                <Textarea value={formData.what_you_bring} onChange={(e) => setFormData({ ...formData, what_you_bring: e.target.value })} rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">Why You Might Love (one per line)</label>
                <Textarea value={formData.why_you_might_love} onChange={(e) => setFormData({ ...formData, why_you_might_love: e.target.value })} rows={3} />
              </div>
              <Button onClick={handleSubmit} disabled={createCareer.isPending || updateCareer.isPending} className="w-full">
                {(createCareer.isPending || updateCareer.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingCareer ? "Update" : "Create"} Position
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader><CardTitle>All Positions ({careers?.length || 0})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-300 hover:bg-transparent">
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers?.map((career) => (
                <TableRow key={career.id} className="border-gray-200 hover:bg-black/5">
                  <TableCell className="font-medium">{career.title}</TableCell>
                  <TableCell>{career.type}</TableCell>
                  <TableCell>{career.location}</TableCell>
                  <TableCell>
                    <Badge variant={career.is_active ? "default" : "secondary"}>
                      {career.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(career.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(career)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteCareer.mutate(career.id)} className="hover:bg-destructive transition-colors group">
                        <Trash2 className="h-4 w-4 text-destructive group-hover:text-white transition-colors" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCareers;
