import { describe, it, expect } from "vitest";
import {
  validateLogin,
  validateSignup,
  validateUpdateProfile,
  type LoginForm,
  type SignupForm,
  type UpdateProfileForm,
} from "@/utils/validators.utils";

describe("validators.utils", () => {
  describe("validateLogin", () => {
    it("should return no errors for valid login data", () => {
      const validData: LoginForm = {
        email: "test@example.com",
        password: "password123",
      };

      const errors = validateLogin(validData);

      expect(errors).toEqual({});
    });

    it("should return error for empty email", () => {
      const data: LoginForm = {
        email: "",
        password: "password123",
      };

      const errors = validateLogin(data);

      expect(errors.email).toBe("아이디를 입력해주세요.");
    });

    it("should return error for whitespace-only email", () => {
      const data: LoginForm = {
        email: "   ",
        password: "password123",
      };

      const errors = validateLogin(data);

      expect(errors.email).toBe("아이디를 입력해주세요.");
    });

    it("should return error for invalid email format", () => {
      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user @example.com",
        "user@example",
      ];

      invalidEmails.forEach(email => {
        const data: LoginForm = { email, password: "password123" };
        const errors = validateLogin(data);
        expect(errors.email).toBe("올바른 이메일을 입력해주세요.");
      });
    });

    it("should return error for empty password", () => {
      const data: LoginForm = {
        email: "test@example.com",
        password: "",
      };

      const errors = validateLogin(data);

      expect(errors.password).toBe("비밀번호를 입력해주세요.");
    });

    it("should return multiple errors when both fields are invalid", () => {
      const data: LoginForm = {
        email: "",
        password: "",
      };

      const errors = validateLogin(data);

      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
    });

    it("should accept valid email formats", () => {
      const validEmails = [
        "test@example.com",
        "user.name@example.com",
        "user+tag@example.co.uk",
        "test123@test-domain.com",
      ];

      validEmails.forEach(email => {
        const data: LoginForm = { email, password: "password" };
        const errors = validateLogin(data);
        expect(errors.email).toBeUndefined();
      });
    });
  });

  describe("validateSignup", () => {
    const validSignupData: SignupForm = {
      name: "홍길동",
      email: "test@example.com",
      companyName: "테스트 회사",
      password: "password123",
      confirmPassword: "password123",
    };

    it("should return no errors for valid signup data", () => {
      const errors = validateSignup(validSignupData, []);

      expect(errors).toEqual({});
    });

    it("should return error for empty name", () => {
      const data = { ...validSignupData, name: "" };
      const errors = validateSignup(data, []);

      expect(errors.name).toBe("이름을 입력해주세요.");
    });

    it("should return error for whitespace-only name", () => {
      const data = { ...validSignupData, name: "   " };
      const errors = validateSignup(data, []);

      expect(errors.name).toBe("이름을 입력해주세요.");
    });

    it("should return error for empty email", () => {
      const data = { ...validSignupData, email: "" };
      const errors = validateSignup(data, []);

      expect(errors.email).toBe("이메일을 입력해주세요.");
    });

    it("should return error for invalid email format", () => {
      const data = { ...validSignupData, email: "invalid-email" };
      const errors = validateSignup(data, []);

      expect(errors.email).toBe("올바른 이메일을 입력해주세요.");
    });

    it("should return error for duplicate email", () => {
      const data = { ...validSignupData, email: "TEST@EXAMPLE.COM" };
      const duplicateEmails = ["test@example.com"];
      const errors = validateSignup(data, duplicateEmails);

      expect(errors.email).toBe("중복된 이메일입니다.");
    });

    it("should normalize email to lowercase for duplicate check", () => {
      const data = { ...validSignupData, email: "Test@Example.Com" };
      const duplicateEmails = ["test@example.com"];
      const errors = validateSignup(data, duplicateEmails);

      expect(errors.email).toBe("중복된 이메일입니다.");
    });

    it("should return error for empty companyName", () => {
      const data = { ...validSignupData, companyName: "" };
      const errors = validateSignup(data, []);

      expect(errors.companyName).toBe("크루명을 정확하게 입력해주세요.");
    });

    it("should return error for empty password", () => {
      const data = { ...validSignupData, password: "" };
      const errors = validateSignup(data, []);

      expect(errors.password).toBe("비밀번호를 입력해주세요.");
    });

    it("should return error for password shorter than 8 characters", () => {
      const data = { ...validSignupData, password: "pass", confirmPassword: "pass" };
      const errors = validateSignup(data, []);

      expect(errors.password).toBe("비밀번호는 8자 이상이어야 합니다.");
    });

    it("should return error for empty confirmPassword", () => {
      const data = { ...validSignupData, confirmPassword: "" };
      const errors = validateSignup(data, []);

      expect(errors.confirmPassword).toBe("비밀번호를 다시 입력해주세요.");
    });

    it("should return error when passwords do not match", () => {
      const data = { ...validSignupData, password: "password123", confirmPassword: "different" };
      const errors = validateSignup(data, []);

      expect(errors.confirmPassword).toBe("비밀번호가 일치하지 않습니다.");
    });

    it("should accept password with exactly 8 characters", () => {
      const data = { ...validSignupData, password: "12345678", confirmPassword: "12345678" };
      const errors = validateSignup(data, []);

      expect(errors.password).toBeUndefined();
    });

    it("should return multiple errors when multiple fields are invalid", () => {
      const data: SignupForm = {
        name: "",
        email: "invalid",
        companyName: "",
        password: "short",
        confirmPassword: "different",
      };

      const errors = validateSignup(data, []);

      expect(errors.name).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.companyName).toBeDefined();
      expect(errors.password).toBeDefined();
      expect(errors.confirmPassword).toBeDefined();
    });
  });

  describe("validateUpdateProfile", () => {
    it("should return no errors for valid profile data", () => {
      const validData: UpdateProfileForm = {
        companyName: "새로운 회사",
      };

      const errors = validateUpdateProfile(validData);

      expect(errors).toEqual({});
    });

    it("should return error for empty companyName", () => {
      const data: UpdateProfileForm = {
        companyName: "",
      };

      const errors = validateUpdateProfile(data);

      expect(errors.companyName).toBe("크루명을 정확하게 입력해주세요.");
    });

    it("should return error for whitespace-only companyName", () => {
      const data: UpdateProfileForm = {
        companyName: "   ",
      };

      const errors = validateUpdateProfile(data);

      expect(errors.companyName).toBe("크루명을 정확하게 입력해주세요.");
    });

    it("should return error for invalid image type", () => {
      const invalidFile = new File(["content"], "test.txt", { type: "text/plain" });
      const data: UpdateProfileForm = {
        companyName: "회사",
        file: invalidFile,
      };

      const errors = validateUpdateProfile(data);

      expect(errors.image).toBe("지원하지 않는 이미지 형식입니다.");
    });

    it("should accept valid image types", () => {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];

      validTypes.forEach(type => {
        const file = new File(["content"], "test.jpg", { type });
        const data: UpdateProfileForm = {
          companyName: "회사",
          file,
        };

        const errors = validateUpdateProfile(data);
        expect(errors.image).toBeUndefined();
      });
    });

    it("should return error for file larger than 5MB", () => {
      const largeContent = new Array(6 * 1024 * 1024).fill("a").join("");
      const largeFile = new File([largeContent], "large.jpg", { type: "image/jpeg" });

      const data: UpdateProfileForm = {
        companyName: "회사",
        file: largeFile,
      };

      const errors = validateUpdateProfile(data);

      expect(errors.image).toBe("이미지 파일은 5MB 이하로 업로드해주세요.");
    });

    it("should accept file exactly 5MB", () => {
      const content = new Array(5 * 1024 * 1024).fill("a").join("");
      const file = new File([content], "exact.jpg", { type: "image/jpeg" });

      const data: UpdateProfileForm = {
        companyName: "회사",
        file,
      };

      const errors = validateUpdateProfile(data);

      expect(errors.image).toBeUndefined();
    });

    it("should validate without file", () => {
      const data: UpdateProfileForm = {
        companyName: "회사",
        file: null,
      };

      const errors = validateUpdateProfile(data);

      expect(errors).toEqual({});
    });

    it("should return multiple errors when both companyName and file are invalid", () => {
      const invalidFile = new File(["content"], "test.txt", { type: "text/plain" });
      const data: UpdateProfileForm = {
        companyName: "",
        file: invalidFile,
      };

      const errors = validateUpdateProfile(data);

      expect(errors.companyName).toBeDefined();
      expect(errors.image).toBeDefined();
    });
  });
});