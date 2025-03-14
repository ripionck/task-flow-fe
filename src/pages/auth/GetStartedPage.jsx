import {
  Calendar,
  Check,
  ChevronRight,
  Grid,
  LayoutList,
  Settings,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    workStyle: '',
    teamSize: '',
    primaryUse: [],
  });

  const steps = [
    {
      title: 'Welcome to TaskFlow',
      description: "Let's set up your workspace in a few quick steps",
    },
    {
      title: 'How do you prefer to work?',
      description: "We'll customize your experience based on your preferences",
      field: 'workStyle',
      options: [
        { value: 'visual', label: 'Visual (Kanban boards, cards)', icon: Grid },
        {
          value: 'list',
          label: 'List-based (To-do lists, checklists)',
          icon: LayoutList,
        },
        {
          value: 'calendar',
          label: 'Calendar-based (Schedules, timelines)',
          icon: Calendar,
        },
      ],
    },
    {
      title: "What's your team size?",
      description: 'This helps us optimize your workspace',
      field: 'teamSize',
      options: [
        { value: 'solo', label: 'Just me' },
        { value: 'small', label: '2-5 people' },
        { value: 'medium', label: '6-20 people' },
        { value: 'large', label: 'More than 20 people' },
      ],
    },
    {
      title: 'What will you use TaskFlow for?',
      description: 'Select all that apply',
      field: 'primaryUse',
      multiple: true,
      options: [
        { value: 'projectManagement', label: 'Project Management' },
        { value: 'taskTracking', label: 'Task Tracking' },
        { value: 'teamCollaboration', label: 'Team Collaboration' },
        { value: 'clientWork', label: 'Client Work' },
        { value: 'productDevelopment', label: 'Product Development' },
        { value: 'marketing', label: 'Marketing Campaigns' },
      ],
    },
    {
      title: "You're all set!",
      description: 'Your workspace is ready to use',
    },
  ];

  const handleOptionSelect = (field, value) => {
    if (field === 'primaryUse') {
      setPreferences((prev) => {
        const currentValues = [...prev[field]];
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [field]: currentValues.filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [field]: [...currentValues, value],
          };
        }
      });
    } else {
      setPreferences((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleNext = () => {
    const currentField = steps[currentStep]?.field;

    // Validate current step if needed
    if (
      currentField &&
      !preferences[currentField] &&
      !steps[currentStep]?.multiple
    ) {
      return; // Don't proceed if no option is selected
    }

    if (
      currentField === 'primaryUse' &&
      preferences[currentField].length === 0
    ) {
      return; // Don't proceed if no option is selected for multiple choice
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - redirect to dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const showOptions =
    currentStepData.options && currentStepData.options.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep
                    ? 'bg-blue-600'
                    : index < currentStep
                    ? 'bg-blue-400'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>

          {isFirstStep && (
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-blue-900">
                    Collaborate with your team
                  </h3>
                  <p className="text-sm text-blue-700">
                    Invite team members and work together seamlessly
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <Grid className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-blue-900">
                    Organize your projects
                  </h3>
                  <p className="text-sm text-blue-700">
                    Create boards, lists, and cards to manage your work
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-blue-900">
                    Customize your workflow
                  </h3>
                  <p className="text-sm text-blue-700">
                    Adapt TaskFlow to your team's unique processes
                  </p>
                </div>
              </div>
            </div>
          )}

          {showOptions && (
            <div
              className={`space-y-3 ${currentStepData.multiple ? 'mb-6' : ''}`}
            >
              {currentStepData.options.map((option) => {
                const isSelected = currentStepData.multiple
                  ? preferences[currentStepData.field].includes(option.value)
                  : preferences[currentStepData.field] === option.value;

                return (
                  <button
                    key={option.value}
                    className={`w-full flex items-center p-4 border rounded-lg transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() =>
                      handleOptionSelect(currentStepData.field, option.value)
                    }
                  >
                    {option.icon && <option.icon className="h-5 w-5 mr-3" />}
                    <span className="flex-1 text-left">{option.label}</span>
                    {isSelected && <Check className="h-5 w-5 text-blue-500" />}
                  </button>
                );
              })}
            </div>
          )}

          {isLastStep && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>

              <div>
                <p className="text-gray-600 mb-4">
                  Your workspace is ready! You can now start creating projects,
                  adding tasks, and inviting your team members.
                </p>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Personalized workspace created</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Default projects set up</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Preferences saved</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`flex ${
              isFirstStep ? 'justify-end' : 'justify-between'
            } mt-8`}
          >
            {!isFirstStep && (
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              {isLastStep ? 'Go to Dashboard' : 'Continue'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;
