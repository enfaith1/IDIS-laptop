import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Settings, Bell, User } from 'lucide-react';

interface Tenant {
  id: number;
  name: string;
  tenantCode: string;
  roomNumber: string;
  phoneNumber: string;
  email: string;
  age: number | string;
  status: 'Active' | 'Inactive' | string;
}

const mockTenants: Tenant[] = [
  { id: 1, name: "Solis, Natalio Feliciano", tenantCode: "Tenant 01", roomNumber: "01", phoneNumber: "09221234567", email: "nsolis_2400000044@uic.edu.ph", age: 20, status: "Active" },
  { id: 2, name: "Dela Cruz, Juan", tenantCode: "Tenant 02", roomNumber: "02", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 3, name: "Dela Cruz, Juan", tenantCode: "Tenant 03", roomNumber: "03", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 4, name: "Dela Cruz, Juan", tenantCode: "Tenant 04", roomNumber: "04", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 5, name: "Dela Cruz, Juan", tenantCode: "Tenant 05", roomNumber: "05", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 6, name: "Dela Cruz, Juan", tenantCode: "Tenant 06", roomNumber: "06", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 7, name: "Dela Cruz, Juan", tenantCode: "Tenant 07", roomNumber: "07", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 8, name: "Dela Cruz, Juan", tenantCode: "Tenant 08", roomNumber: "08", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 9, name: "Dela Cruz, Juan", tenantCode: "Tenant 09", roomNumber: "09", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" },
  { id: 10, name: "Dela Cruz, Juan", tenantCode: "Tenant 10", roomNumber: "10", phoneNumber: "Cell Text", email: "Cell Text", age: "Cell Text", status: "Inactive" }
];

function Payments() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Payment Management</h3>
        <p className="text-gray-600">Manage tenant payments and billing.</p>
      </div>
    </div>
  );
}

function Notifications() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Notification Center</h3>
        <p className="text-gray-600">View and manage system notifications.</p>
      </div>
    </div>
  );
}

function SettingsComponent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">System Settings</h3>
        <p className="text-gray-600">Configure system preferences and options.</p>
      </div>
    </div>
  );
}

function Tenants() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Tenant>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Add Tenant'>('Overview');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const itemsPerPage = 10;

  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    name: '',
    tenantCode: '',
    roomNumber: '',
    phoneNumber: '',
    email: '',
    age: '',
    status: 'Active'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (showSuccessMessage) {
      const t = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showSuccessMessage]);

  const filteredTenants = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return tenants;
    return tenants.filter((t) =>
      String(t.name).toLowerCase().includes(term) ||
      String(t.roomNumber).toLowerCase().includes(term) ||
      String(t.email).toLowerCase().includes(term) ||
      String(t.phoneNumber).toLowerCase().includes(term)
    );
  }, [searchTerm, tenants]);

  const sortedTenants = useMemo(() => {
    const arr = [...filteredTenants];
    arr.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const aNum = typeof aVal === 'number' ? (aVal as number) : Number(aVal as any);
      const bNum = typeof bVal === 'number' ? (bVal as number) : Number(bVal as any);

      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      const aStr = String(aVal ?? '').toLowerCase();
      const bStr = String(bVal ?? '').toLowerCase();
      if (aStr === bStr) return 0;
      return sortDirection === 'asc' ? (aStr > bStr ? 1 : -1) : (aStr < bStr ? 1 : -1);
    });
    return arr;
  }, [filteredTenants, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedTenants.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTenants = sortedTenants.slice(startIndex, endIndex);

  const handleSort = (field: keyof Tenant) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  const handleInputChange = (key: keyof Tenant, value: string) => {
    setNewTenant(prev => ({ ...prev, [key]: value }));
    setFormErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!newTenant.name || !String(newTenant.name).trim()) errors.name = 'Full name is required.';
    if (!newTenant.roomNumber || !String(newTenant.roomNumber).trim()) errors.roomNumber = 'Room number is required.';
    if (!newTenant.phoneNumber || !String(newTenant.phoneNumber).trim()) errors.phoneNumber = 'Phone number is required.';
    if (!newTenant.email || !String(newTenant.email).trim()) errors.email = 'Email is required.';
    if (!newTenant.age || String(newTenant.age).trim() === '') errors.age = 'Age is required.';

    const email = String(newTenant.email).toLowerCase();
    if (tenants.some(t => String(t.email).toLowerCase() === email)) errors.email = 'Email already exists.';
    const room = String(newTenant.roomNumber);
    if (tenants.some(t => String(t.roomNumber) === room)) errors.roomNumber = 'Room number already taken.';

    const ageNum = Number(newTenant.age);
    if (Number.isNaN(ageNum) || ageNum < 16 || ageNum > 65) errors.age = 'Age must be a number between 16 and 65.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetForm = () => {
    setNewTenant({ name: '', tenantCode: '', roomNumber: '', phoneNumber: '', email: '', age: '', status: 'Active' });
    setFormErrors({});
  };

  const handleAddTenant = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) return;

    const maxId = tenants.reduce((m, t) => Math.max(m, t.id), 0);
    const created: Tenant = {
      id: maxId + 1,
      name: String(newTenant.name).trim(),
      tenantCode: newTenant.tenantCode && String(newTenant.tenantCode).trim() ? String(newTenant.tenantCode).trim() : `Tenant ${maxId + 1}`,
      roomNumber: String(newTenant.roomNumber).trim(),
      phoneNumber: String(newTenant.phoneNumber).trim(),
      email: String(newTenant.email).trim(),
      age: isNaN(Number(newTenant.age)) ? String(newTenant.age) : Number(newTenant.age),
      status: (newTenant.status as Tenant['status']) || 'Active'
    };

    setTenants(prev => [created, ...prev]);
    handleResetForm();
    setShowSuccessMessage(true);
    setActiveTab('Overview');
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BD</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">BORDERLINE DORMITORY</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/images_icons/userIcon.png" 
              alt="User Profile" 
              className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => console.log('User profile clicked')}
            />
          </div>
            <img 
               src="/images_icons/notifationIcon.png" 
              alt="Notifications" 
              className="h-5 w-5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => console.log('Bell clicked')}
            />
            <img 
              src="/images_icons/settingsIcon.png" 
              alt="Settings" 
              className="h-5 w-5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => console.log('Settings clicked')}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tenant Dashboard</h2>
        <div className="flex space-x-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('Overview')}
            className={`pb-2 px-1 border-b-2 transition-colors ${activeTab === 'Overview' ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('Add Tenant')}
            className={`pb-2 px-1 border-b-2 transition-colors ${activeTab === 'Add Tenant' ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Add Tenant
          </button>
        </div>
      </div>

      {activeTab === 'Overview' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Tenants</span>
                      <span className="text-xs">{sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
                    </div>
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('roomNumber')}>
                    <div className="flex items-center space-x-1">
                      <span>Room Number</span>
                      <span className="text-xs">{sortField === 'roomNumber' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
                    </div>
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Phone Number</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Age</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><User className="h-4 w-4 text-gray-500" /></div>
                        <div>
                          <div className="font-medium text-gray-900">{tenant.name}</div>
                          <div className="text-sm text-gray-500">{tenant.tenantCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{tenant.roomNumber}</td>
                    <td className="py-4 px-6 text-gray-900">{tenant.phoneNumber}</td>
                    <td className="py-4 px-6 text-gray-900">{tenant.email}</td>
                    <td className="py-4 px-6 text-gray-900">{tenant.age}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${tenant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {tenant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"><ChevronLeft className="h-4 w-4" /></button>

              {generatePageNumbers().map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>{page}</button>
              ))}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2 text-gray-500">...</span>
                  <button onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">{totalPages}</button>
                </>
              )}

              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center space-x-1">
                <span className="text-sm">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Showing {sortedTenants.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, sortedTenants.length)} of {sortedTenants.length} results
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Add Tenant' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Tenant added successfully!</span>
              </div>
            </div>
          )}

          <h3 className="text-lg font-semibold mb-4">Add New Tenant</h3>
          <p className="text-gray-600 mb-6">Fill in the details to add a new tenant to the system.</p>

          <form onSubmit={handleAddTenant} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input type="text" value={newTenant.name ?? ''} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Enter full name" className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number <span className="text-red-500">*</span></label>
                <input type="text" value={newTenant.roomNumber ?? ''} onChange={(e) => handleInputChange('roomNumber', e.target.value)} placeholder="Enter room number" className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.roomNumber ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors.roomNumber && <p className="mt-1 text-sm text-red-500">{formErrors.roomNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" value={newTenant.phoneNumber ?? ''} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} placeholder="09123456789" className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-500">{formErrors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input type="email" value={newTenant.email ?? ''} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="example@email.com" className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age <span className="text-red-500">*</span></label>
                <input type="number" value={newTenant.age ?? ''} onChange={(e) => handleInputChange('age', e.target.value)} placeholder="Enter age" min={16} max={65} className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.age ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors.age && <p className="mt-1 text-sm text-red-500">{formErrors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status <span className="text-red-500">*</span></label>
                <select value={newTenant.status ?? 'Active'} onChange={(e) => handleInputChange('status', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button type="button" onClick={handleResetForm} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Reset Form</button>

              <div className="flex space-x-3">
                <button type="button" onClick={() => setActiveTab('Overview')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Tenant
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Form Guidelines:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• All fields marked with * are required</li>
              <li>• Phone number should be 11 digits (e.g., 09123456789)</li>
              <li>• Email address must be unique</li>
              <li>• Room number must be unique</li>
              <li>• Age should be between 16 and 65 years</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'tenants' | 'payments' | 'notifications' | 'settings'>('tenants');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'tenants', label: 'Tenants', icon: '' },
    { id: 'payments', label: 'Payments', icon: '' },
    { id: 'notifications', label: 'Notifications', icon: '' },
    { id: 'settings', label: 'Settings', icon: '' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tenants': return <Tenants />;
      case 'payments': return <Payments />;
      case 'notifications': return <Notifications />;
      case 'settings': return <SettingsComponent />;
      default: return <Tenants />;
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as any);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#FFFFFF] text-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">BOARDERLINE DORMITORY</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800">✕</button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input type="text" placeholder="Search for..." className="w-full bg-[#F2F4F8] text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6C8FF]" />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3
                  ${activeTab === tab.id
                    ? 'bg-[#A6C8FF] text-gray-800 font-semibold'
                    : 'bg-[#F2F4F8] text-gray-800 hover:bg-[#E8EEF9] hover:text-gray-900'
                  }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[#E5E7EB]">
          <button onClick={() => window.location.href = '/'} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#F2F4F8] rounded-lg transition-colors duration-200 flex items-center space-x-3">
            <span></span><span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-0 w-full">
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">{tabs.find(tab => tab.id === activeTab)?.label}</h1>
          <div className="w-6" />
        </div>

        <div className="min-h-full overflow-auto">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}