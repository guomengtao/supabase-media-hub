export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          id: number
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      answer_list: {
        Row: {
          answer_text: string
          created_at: string | null
          difficulty_level: string | null
          evaluation_status: string | null
          grade_time: string | null
          graded_by: number | null
          id: number
          metadata: Json | null
          question_id: number | null
          score: number | null
          submission_time: string | null
          teacher_comment: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          answer_text: string
          created_at?: string | null
          difficulty_level?: string | null
          evaluation_status?: string | null
          grade_time?: string | null
          graded_by?: number | null
          id?: number
          metadata?: Json | null
          question_id?: number | null
          score?: number | null
          submission_time?: string | null
          teacher_comment?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          answer_text?: string
          created_at?: string | null
          difficulty_level?: string | null
          evaluation_status?: string | null
          grade_time?: string | null
          graded_by?: number | null
          id?: number
          metadata?: Json | null
          question_id?: number | null
          score?: number | null
          submission_time?: string | null
          teacher_comment?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "answer_list_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_deleted: boolean
          tags: string[] | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean
          tags?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      courser: {
        Row: {
          created_at: string | null
          department: string | null
          description: string | null
          id: string
          instructor: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          instructor?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          instructor?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          code: string
          courser_id: string | null
          created_at: string | null
          department: string | null
          description: string | null
          id: number
          instructor: string | null
          name: string
          semester: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          code: string
          courser_id?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: number
          instructor?: string | null
          name: string
          semester?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          code?: string
          courser_id?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: number
          instructor?: string | null
          name?: string
          semester?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_courser_id_fkey"
            columns: ["courser_id"]
            isOneToOne: false
            referencedRelation: "courser"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          path: string | null
          size: number | null
          status: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          path?: string | null
          size?: number | null
          status?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          path?: string | null
          size?: number | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      drill: {
        Row: {
          answer_text: string | null
          created_at: string | null
          difficulty_level: string | null
          evaluation_status: string | null
          grade_time: string | null
          graded_by: number | null
          id: number | null
          metadata: Json | null
          question_id: number | null
          score: number | null
          submission_time: string | null
          teacher_comment: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          answer_text?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          evaluation_status?: string | null
          grade_time?: string | null
          graded_by?: number | null
          id?: number | null
          metadata?: Json | null
          question_id?: number | null
          score?: number | null
          submission_time?: string | null
          teacher_comment?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          answer_text?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          evaluation_status?: string | null
          grade_time?: string | null
          graded_by?: number | null
          id?: number | null
          metadata?: Json | null
          question_id?: number | null
          score?: number | null
          submission_time?: string | null
          teacher_comment?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      files: {
        Row: {
          created_at: string
          id: string
          name: string
          path: string
          size: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          path: string
          size: number
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          path?: string
          size?: number
          type?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          id: string
          name: string
          size: number
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          size: number
          type: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          size?: number
          type?: string
          url?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          created_at: string
          description: string | null
          error_message: string | null
          file_path: string | null
          github_action_url: string | null
          id: string
          line_number: number | null
          resolved_at: string | null
          severity: string | null
          status: string | null
          test_name: string | null
          title: string
          updated_at: string
          workflow_name: string | null
          workflow_run_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          error_message?: string | null
          file_path?: string | null
          github_action_url?: string | null
          id?: string
          line_number?: number | null
          resolved_at?: string | null
          severity?: string | null
          status?: string | null
          test_name?: string | null
          title: string
          updated_at?: string
          workflow_name?: string | null
          workflow_run_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          error_message?: string | null
          file_path?: string | null
          github_action_url?: string | null
          id?: string
          line_number?: number | null
          resolved_at?: string | null
          severity?: string | null
          status?: string | null
          test_name?: string | null
          title?: string
          updated_at?: string
          workflow_name?: string | null
          workflow_run_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: number
          is_admin_reply: boolean | null
          is_hidden: boolean | null
          name: string
          parent_id: number | null
          project_id: number | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          is_admin_reply?: boolean | null
          is_hidden?: boolean | null
          name?: string
          parent_id?: number | null
          project_id?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          is_admin_reply?: boolean | null
          is_hidden?: boolean | null
          name?: string
          parent_id?: number | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          answer: string | null
          course_id: number | null
          created_at: string | null
          data: Json | null
          id: number
          question: string
          updated_at: string | null
        }
        Insert: {
          answer?: string | null
          course_id?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string | null
          course_id?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      screenshot_uploads: {
        Row: {
          created_at: string
          filename: string
          id: number
          metadata: Json | null
          upload_time: string
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          filename: string
          id?: number
          metadata?: Json | null
          upload_time?: string
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          filename?: string
          id?: number
          metadata?: Json | null
          upload_time?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      supabase_articles: {
        Row: {
          content: string
          created_at: string | null
          id: number
          is_deleted: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          is_deleted?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          is_deleted?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      "test-tom-table": {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_answer_entry:
        | {
            Args: {
              p_question_id: string
              p_answer_contents: string
              p_teacher_comment?: string
              p_score?: number
            }
            Returns: {
              total_answers: number
              answer_contents: string
              teacher_comment: string
              score: number
            }[]
          }
        | {
            Args: {
              p_question_id: string
              p_answer_contents?: string
              p_teacher_comment?: string
              p_score?: number
              p_is_initial?: boolean
            }
            Returns: {
              total_answers: number
              answer_contents: string
              teacher_comment: string
              score: number
              is_initial: boolean
            }[]
          }
      exec_sql: {
        Args: {
          sql: string
        }
        Returns: undefined
      }
      get_courses_with_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          course_id: number
          course_name: string
          course_code: string
          courser_name: string
          courser_department: string
          courser_instructor: string
          total_questions: number
          total_answers: number
          avg_answer_score: number
        }[]
      }
      get_questions_with_course: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          question: string
          answer: string
          course_id: number
          course_name: string
          course_code: string
          total_answers: number
          data: Json
        }[]
      }
      increment_answer_count: {
        Args: {
          question_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never