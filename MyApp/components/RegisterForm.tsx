import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email không được để trống';
    if (!emailRegex.test(email)) return 'Email không đúng định dạng';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Mật khẩu không được để trống';
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    return undefined;
  };

  const validateConfirmPassword = (confirmPassword: string, password: string): string | undefined => {
    if (!confirmPassword) return 'Xác nhận mật khẩu không được để trống';
    if (confirmPassword !== password) return 'Mật khẩu không trùng khớp';
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Tên không được để trống';
    return undefined;
  };

  // Handle input change
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle input blur (validation)
  const handleInputBlur = (field: keyof FormData) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    
    let error: string | undefined;
    
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.confirmPassword, formData.password);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    return !nameError && !emailError && !passwordError && !confirmPasswordError;
  };

  // Handle registration
  const handleRegister = () => {
    // Mark all fields as touched
    setTouchedFields({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // If form is valid, show success
    if (isFormValid()) {
      Alert.alert(
        'Thành công',
        'Đăng ký tài khoản thành công!',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Form Đăng ký có xác thực</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Tạo tài khoản</Text>
        
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.name && errors.name && styles.inputError
            ]}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            onBlur={() => handleInputBlur('name')}
            placeholder="Le Van Tam"
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
          {touchedFields.name && errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
        </View>
        
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.email && errors.email && styles.inputError
            ]}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            onBlur={() => handleInputBlur('email')}
            placeholder="vantam@gmail.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {touchedFields.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>
        
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.password && errors.password && styles.inputError
            ]}
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            onBlur={() => handleInputBlur('password')}
            placeholder="••••••"
            placeholderTextColor="#999"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {touchedFields.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
        
        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Xác nhận mật khẩu</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.confirmPassword && errors.confirmPassword && styles.inputError
            ]}
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            onBlur={() => handleInputBlur('confirmPassword')}
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>
        
        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.registerButton,
            !isFormValid() && styles.registerButtonDisabled
          ]}
          onPress={handleRegister}
          activeOpacity={isFormValid() ? 0.8 : 1}
          disabled={!isFormValid()}
        >
          <Text style={[
            styles.registerButtonText,
            !isFormValid() && styles.registerButtonTextDisabled
          ]}>
            ĐĂNG KÝ
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.description}>
        📝 Form validation: Kiểm tra dữ liệu realtime khi blur và disable button khi form invalid
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#333333',
  },
  inputError: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#28a745',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonDisabled: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerButtonTextDisabled: {
    color: '#999999',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default RegisterForm;