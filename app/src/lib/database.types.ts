export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      personas: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          filters: Json;
          active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          filters?: Json;
          active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          filters?: Json;
          active?: boolean;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          place_id: string;
          business_name: string;
          address: string | null;
          city: string | null;
          state: string | null;
          phone: string | null;
          website: string | null;
          rating: number | null;
          review_count: number | null;
          category: string | null;
          email: string | null;
          contact_name: string | null;
          contact_title: string | null;
          linkedin_url: string | null;
          status: string;
          persona_id: string | null;
          notes: string | null;
          source: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          place_id: string;
          business_name: string;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          phone?: string | null;
          website?: string | null;
          rating?: number | null;
          review_count?: number | null;
          category?: string | null;
          email?: string | null;
          contact_name?: string | null;
          contact_title?: string | null;
          linkedin_url?: string | null;
          status?: string;
          persona_id?: string | null;
          notes?: string | null;
          source?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          place_id?: string;
          business_name?: string;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          phone?: string | null;
          website?: string | null;
          rating?: number | null;
          review_count?: number | null;
          category?: string | null;
          email?: string | null;
          contact_name?: string | null;
          contact_title?: string | null;
          linkedin_url?: string | null;
          status?: string;
          persona_id?: string | null;
          notes?: string | null;
          source?: string;
        };
        Relationships: [];
      };
      cadences: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          persona_id: string | null;
          active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          persona_id?: string | null;
          active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          persona_id?: string | null;
          active?: boolean;
        };
        Relationships: [];
      };
      cadence_steps: {
        Row: {
          id: string;
          cadence_id: string;
          step_number: number;
          delay_days: number;
          type: string;
          subject: string | null;
          body: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          cadence_id: string;
          step_number: number;
          delay_days?: number;
          type?: string;
          subject?: string | null;
          body: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          cadence_id?: string;
          step_number?: number;
          delay_days?: number;
          type?: string;
          subject?: string | null;
          body?: string;
          active?: boolean;
        };
        Relationships: [];
      };
      enrollments: {
        Row: {
          id: string;
          created_at: string;
          lead_id: string;
          cadence_id: string;
          current_step: number;
          status: string;
          next_send_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          lead_id: string;
          cadence_id: string;
          current_step?: number;
          status?: string;
          next_send_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          lead_id?: string;
          cadence_id?: string;
          current_step?: number;
          status?: string;
          next_send_at?: string | null;
        };
        Relationships: [];
      };
      email_sends: {
        Row: {
          id: string;
          sent_at: string;
          enrollment_id: string | null;
          step_id: string | null;
          lead_id: string | null;
          to_email: string;
          subject: string | null;
          resend_id: string | null;
          status: string;
          opened_at: string | null;
          clicked_at: string | null;
          replied_at: string | null;
        };
        Insert: {
          id?: string;
          sent_at?: string;
          enrollment_id?: string | null;
          step_id?: string | null;
          lead_id?: string | null;
          to_email: string;
          subject?: string | null;
          resend_id?: string | null;
          status?: string;
          opened_at?: string | null;
          clicked_at?: string | null;
          replied_at?: string | null;
        };
        Update: {
          id?: string;
          sent_at?: string;
          enrollment_id?: string | null;
          step_id?: string | null;
          lead_id?: string | null;
          to_email?: string;
          subject?: string | null;
          resend_id?: string | null;
          status?: string;
          opened_at?: string | null;
          clicked_at?: string | null;
          replied_at?: string | null;
        };
        Relationships: [];
      };
      call_logs: {
        Row: {
          id: string;
          created_at: string;
          lead_id: string;
          notes: string | null;
          outcome: string | null;
          duration_minutes: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          lead_id: string;
          notes?: string | null;
          outcome?: string | null;
          duration_minutes?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          lead_id?: string;
          notes?: string | null;
          outcome?: string | null;
          duration_minutes?: number | null;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          lead_id: string | null;
          title: string;
          description: string | null;
          type: string;
          status: string;
          due_at: string | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          title: string;
          description?: string | null;
          type?: string;
          status?: string;
          due_at?: string | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          title?: string;
          description?: string | null;
          type?: string;
          status?: string;
          due_at?: string | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Persona = Database["public"]["Tables"]["personas"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type Cadence = Database["public"]["Tables"]["cadences"]["Row"];
export type CadenceStep = Database["public"]["Tables"]["cadence_steps"]["Row"];
export type Enrollment = Database["public"]["Tables"]["enrollments"]["Row"];
export type EmailSend = Database["public"]["Tables"]["email_sends"]["Row"];
export type Task = Database["public"]["Tables"]["tasks"]["Row"];
