import React from 'react';
import { Button } from '../../../shared/components/ui/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/Card/Card';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export function TestManagementPage() {
  const tests = [
    {
      id: '1',
      title: 'Mathematical Reasoning',
      questions: 30,
      duration: 60,
      difficulty: 'Medium',
      status: 'Active',
      created: '2024-01-15'
    },
    {
      id: '2',
      title: 'Critical Thinking',
      questions: 40,
      duration: 90,
      difficulty: 'Hard',
      status: 'Draft',
      created: '2024-01-10'
    },
    {
      id: '3',
      title: 'Reading Comprehension',
      questions: 20,
      duration: 45,
      difficulty: 'Easy',
      status: 'Active',
      created: '2024-01-08'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Test Management</h1>
          <p className="text-gray-600">Create and manage your tests</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Create New Test
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Questions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Difficulty</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{test.title}</td>
                    <td className="py-3 px-4">{test.questions}</td>
                    <td className="py-3 px-4">{test.duration} min</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        test.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {test.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{test.created}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}