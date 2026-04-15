import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', price: '', duration: '', region: ''
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => setDestinations(data));
  };

  const handleOpenModal = (dest: any = null) => {
    if (dest) {
      setEditingId(dest.id);
      setFormData(dest);
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', image: '', price: '', duration: '', region: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/destinations/${editingId}` : '/api/destinations';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    fetchDestinations();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      fetchDestinations();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Manage Destinations</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-theme hover:bg-theme/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">Image</th>
              <th className="p-4 font-semibold text-gray-600">Title</th>
              <th className="p-4 font-semibold text-gray-600">Region</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <img src={dest.image} alt={dest.title} className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="p-4 font-medium text-gray-900">{dest.title}</td>
                <td className="p-4 text-gray-600">{dest.region}</td>
                <td className="p-4 text-gray-600">{dest.price}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenModal(dest)} className="text-blue-600 hover:text-blue-800 p-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(dest.id)} className="text-red-600 hover:text-red-800 p-2 ml-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {destinations.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No destinations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Destination' : 'Add Destination'}</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <input required type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme outline-none resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg font-medium bg-theme text-white hover:bg-theme/90">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
