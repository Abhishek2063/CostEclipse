import   { useState, forwardRef } from 'react';
import { Card } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Checkbox } from './checkbox';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Switch } from './switch';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Info, 
  Upload, 
  X, 
  Calendar as CalendarIcon,
  Clock,
  Star,
  Phone,
  Mail,
  Lock,
  DollarSign,
  Percent,
  Hash,
  Type,
  FileText,
  Link,
  Search,
} from 'lucide-react';
import { toast } from "sonner";

export interface FormField {
  id: string;
  type: any;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
  };
  tooltip?: string;
  helpText?: string;
  icon?: React.ReactNode;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number;
  showCharacterCount?: boolean;
  currency?: string;
  step?: number;
  defaultValue?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  containerClassName?: string;
  dependencies?: string[];
}

interface FormData {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

interface CustomFormProps {
  fields: FormField[];
  onSubmit: (data: FormData) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  showProgress?: boolean;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  onFieldChange?: (fieldId: string, value: any, formData: FormData) => void;
  initialData?: FormData;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  resetOnSubmit?: boolean;
  showRequiredIndicator?: boolean;
}

const getFieldIcon = (type: string, customIcon?: React.ReactNode) => {
  if (customIcon) return customIcon;
  
  switch (type) {
    case 'email': return <Mail className="h-4 w-4" />;
    case 'password': return <Lock className="h-4 w-4" />;
    case 'tel': return <Phone className="h-4 w-4" />;
    case 'url': return <Link className="h-4 w-4" />;
    case 'search': return <Search className="h-4 w-4" />;
    case 'textarea': return <FileText className="h-4 w-4" />;
    case 'date': return <CalendarIcon className="h-4 w-4" />;
    case 'time': return <Clock className="h-4 w-4" />;
    case 'currency': return <DollarSign className="h-4 w-4" />;
    case 'percentage': return <Percent className="h-4 w-4" />;
    case 'number': return <Hash className="h-4 w-4" />;
    case 'file': return <Upload className="h-4 w-4" />;
    default: return <Type className="h-4 w-4" />;
  }
};

export const CustomForm = forwardRef<HTMLFormElement, CustomFormProps>(({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  submitButtonIcon,
  isLoading = false,
  disabled = false,
  showProgress = false,
  className = '',
  title,
  description,
  footer,
  onFieldChange,
  initialData = {},
  validateOnChange = false,
  validateOnBlur = true,
  resetOnSubmit = false,
  showRequiredIndicator = true,
  ...props
}, ref) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }

    if (!value) return null;

    const { validation } = field;
    if (!validation) return null;

    if (validation.min && typeof value === 'number' && value < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }

    if (validation.max && typeof value === 'number' && value > validation.max) {
      return `${field.label} must not exceed ${validation.max}`;
    }

    if (validation.minLength && typeof value === 'string' && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    if (validation.maxLength && typeof value === 'string' && value.length > validation.maxLength) {
      return `${field.label} must not exceed ${validation.maxLength} characters`;
    }

    if (validation.pattern && typeof value === 'string' && !validation.pattern.test(value)) {
      return `${field.label} format is invalid`;
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    const newFormData = { ...formData, [fieldId]: value };
    setFormData(newFormData);

    if (validateOnChange) {
      const field = fields.find(f => f.id === fieldId);
      if (field) {
        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [fieldId]: error || '' }));
      }
    }

    if (onFieldChange) {
      onFieldChange(fieldId, value, newFormData);
    }

    // Handle field dependencies
    const field = fields.find(f => f.id === fieldId);
    if (field?.dependencies) {
      field.dependencies.forEach(depId => {
        const depField = fields.find(f => f.id === depId);
        if (depField) {
          const depError = validateField(depField, formData[depId]);
          setErrors(prev => ({ ...prev, [depId]: depError || '' }));
        }
      });
    }
  };

  const handleFieldBlur = (fieldId: string) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    if (validateOnBlur) {
      const field = fields.find(f => f.id === fieldId);
      if (field) {
        const error = validateField(field, formData[field.id]);
        setErrors(prev => ({ ...prev, [fieldId]: error || '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      await onSubmit(formData);
      
      if (resetOnSubmit) {
        setFormData(initialData);
        setErrors({});
        setTouched({});
        setUploadedFiles({});
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form');
    }
  };

  const handleFileUpload = (fieldId: string, files: FileList | null) => {
    if (!files) return;

    const field = fields.find(f => f.id === fieldId);
    const fileArray = Array.from(files);
    
    // Validate file size
    if (field?.maxFileSize) {
      const invalidFiles = fileArray.filter(file => file.size > field.maxFileSize!);
      if (invalidFiles.length > 0) {
        toast.error(`Some files exceed the maximum size of ${(field.maxFileSize / 1024 / 1024).toFixed(1)}MB`);
        return;
      }
    }

    // Validate file count
    if (field?.maxFiles && fileArray.length > field.maxFiles) {
      toast.error(`Maximum ${field.maxFiles} files allowed`);
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [fieldId]: fileArray }));
    handleFieldChange(fieldId, field?.multiple ? fileArray : fileArray[0]);
  };

  const removeFile = (fieldId: string, fileIndex: number) => {
    const currentFiles = uploadedFiles[fieldId] || [];
    const newFiles = currentFiles.filter((_, index) => index !== fileIndex);
    setUploadedFiles(prev => ({ ...prev, [fieldId]: newFiles }));
    
    const field = fields.find(f => f.id === fieldId);
    handleFieldChange(fieldId, field?.multiple ? newFiles : newFiles[0] || null);
  };

  const renderField = (field: FormField) => {
    const fieldValue = formData[field.id] || field.defaultValue || '';
    const fieldError = errors[field.id];
    const isTouched = touched[field.id];
    const showError = fieldError && isTouched;

    const baseInputProps = {
      id: field.id,
      disabled: field.disabled || disabled,
      readOnly: field.readonly,
      className: `${field.className || ''}`,
      onBlur: () => handleFieldBlur(field.id),
      onFocus: field.onFocus,
    };

    const renderInputWithIcon = (input: React.ReactNode) => {
      if (!field.icon && !getFieldIcon(field.type)) return input;
      
      return (
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {field.icon || getFieldIcon(field.type)}
          </div>
          <div className="pl-10">
            {input}
          </div>
        </div>
      );
    };

    let fieldElement: React.ReactNode;

    switch (field.type) {
      case 'textarea':
        fieldElement = (
          <Textarea
            {...baseInputProps}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            rows={4}
          />
        );
        break;

      case 'select':
        fieldElement = (
          <Select value={fieldValue} onValueChange={(value) => handleFieldChange(field.id, value)}>
            <SelectTrigger disabled={field.disabled || disabled}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case 'checkbox':
        fieldElement = (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={fieldValue}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              disabled={field.disabled || disabled}
            />
            <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
              {field.label}
            </Label>
          </div>
        );
        break;

      case 'radio':
        fieldElement = (
          <RadioGroup value={fieldValue} onValueChange={(value) => handleFieldChange(field.id, value)}>
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} disabled={option.disabled || field.disabled || disabled} />
                <Label htmlFor={`${field.id}-${option.value}`} className="text-sm font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        break;

      case 'switch':
        fieldElement = (
          <div className="flex items-center space-x-2">
            <Switch
              id={field.id}
              checked={fieldValue}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              disabled={field.disabled || disabled}
            />
            <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
              {field.label}
            </Label>
          </div>
        );
        break;

      case 'file':
        fieldElement = (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById(`file-${field.id}`)?.click()}
                disabled={field.disabled || disabled}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <span className="text-sm text-muted-foreground">
                {field.accept && `Accepted: ${field.accept}`}
                {field.maxFileSize && ` • Max: ${(field.maxFileSize / 1024 / 1024).toFixed(1)}MB`}
              </span>
            </div>
            <input
              id={`file-${field.id}`}
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) => handleFileUpload(field.id, e.target.files)}
              className="hidden"
            />
            {uploadedFiles[field.id] && uploadedFiles[field.id].length > 0 && (
              <div className="space-y-1">
                {uploadedFiles[field.id].map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-accent rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(field.id, index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        break;

      case 'rating':
        fieldElement = (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleFieldChange(field.id, rating)}
                className="p-1 hover:scale-110 transition-transform"
                disabled={field.disabled || disabled}
              >
                <Star 
                  className={`h-6 w-6 ${
                    rating <= fieldValue ? 'text-warning fill-warning' : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
        );
        break;

      case 'currency':
        fieldElement = renderInputWithIcon(
          <Input
            {...baseInputProps}
            type="number"
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
            step={field.step || 0.01}
            className="pl-10"
          />
        );
        break;

      case 'percentage':
        fieldElement = (
          <div className="relative">
            <Input
              {...baseInputProps}
              type="number"
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
              step={field.step || 1}
              min={0}
              max={100}
              className="pr-8"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              %
            </div>
          </div>
        );
        break;

      case 'password':
        fieldElement = (
          <div className="relative">
            <Input
              {...baseInputProps}
              type={showPassword[field.id] ? 'text' : 'password'}
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(prev => ({ ...prev, [field.id]: !prev[field.id] }))}
            >
              {showPassword[field.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        );
        break;

      default:
        fieldElement = renderInputWithIcon(
          <Input
            {...baseInputProps}
            type={field.type}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            step={field.step}
            className={field.icon ? 'pl-10' : ''}
          />
        );
    }

    if (field.type === 'checkbox' || field.type === 'switch') {
      return (
        <div key={field.id} className={`space-y-2 ${field.containerClassName || ''}`}>
          {fieldElement}
          {field.helpText && (
            <p className="text-sm text-muted-foreground">{field.helpText}</p>
          )}
          {showError && (
            <div className="flex items-center gap-1 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {fieldError}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={field.id} className={`space-y-2 ${field.containerClassName || ''}`}>
        {field?.type !== 'checkbox' && field?.type !== 'switch' && (
          <div className="flex items-center gap-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && showRequiredIndicator && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {field.tooltip && (
              <div className="group relative">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {field.tooltip}
                </div>
              </div>
            )}
          </div>
        )}
        
        {fieldElement}
        
        {field.helpText && (
          <p className="text-sm text-muted-foreground">{field.helpText}</p>
        )}
        
        {field.showCharacterCount && fieldValue && (
          <div className="text-xs text-muted-foreground text-right">
            {fieldValue.length}
            {field.validation?.maxLength && ` / ${field.validation.maxLength}`}
          </div>
        )}
        
        {showError && (
          <div className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {fieldError}
          </div>
        )}
      </div>
    );
  };

  const completedFields = fields.filter(field => {
    const value = formData[field.id];
    return value !== undefined && value !== null && value !== '';
  }).length;

  const progressPercentage = (completedFields / fields.length) * 100;

  return (
    <Card className={`p-6 ${className}`}>
      <form ref={ref} onSubmit={handleSubmit} className="space-y-6" {...props}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}
        
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedFields}/{fields.length} fields</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {fields.map(renderField)}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            disabled={isLoading || disabled}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                Processing...
              </>
            ) : (
              <>
                {submitButtonIcon && <span className="mr-2">{submitButtonIcon}</span>}
                {submitButtonText}
              </>
            )}
          </Button>
        </div>
        
        {footer && (
          <div className="pt-4 border-t">
            {footer}
          </div>
        )}
      </form>
    </Card>
  );
});

CustomForm.displayName = 'CustomForm';

export default CustomForm;