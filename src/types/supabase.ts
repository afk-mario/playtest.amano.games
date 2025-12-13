export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      feedback: {
        Row: {
          created_at: string
          game: number | null
          id: number
          platform: string | null
          playtester: number
          status: string | null
          text: string | null
          timestamp: string
          url: string | null
        }
        Insert: {
          created_at?: string
          game?: number | null
          id?: number
          platform?: string | null
          playtester: number
          status?: string | null
          text?: string | null
          timestamp?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          game?: number | null
          id?: number
          platform?: string | null
          playtester?: number
          status?: string | null
          text?: string | null
          timestamp?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_game_fkey"
            columns: ["game"]
            isOneToOne: false
            referencedRelation: "game"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_playtester_fkey"
            columns: ["playtester"]
            isOneToOne: false
            referencedRelation: "playtester"
            referencedColumns: ["id"]
          },
        ]
      }
      game: {
        Row: {
          created_at: string
          id: number
          itch_id: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          itch_id?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          itch_id?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      game_key: {
        Row: {
          claimed: boolean | null
          created_at: string
          game: number | null
          id: number
          key_sent: string | null
          playtester: number | null
          url: string | null
        }
        Insert: {
          claimed?: boolean | null
          created_at?: string
          game?: number | null
          id?: number
          key_sent?: string | null
          playtester?: number | null
          url?: string | null
        }
        Update: {
          claimed?: boolean | null
          created_at?: string
          game?: number | null
          id?: number
          key_sent?: string | null
          playtester?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_key_game_fkey"
            columns: ["game"]
            isOneToOne: false
            referencedRelation: "game"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game-key_playtester_fkey"
            columns: ["playtester"]
            isOneToOne: false
            referencedRelation: "playtester"
            referencedColumns: ["id"]
          },
        ]
      }
      incident: {
        Row: {
          created_at: string
          id: number
          note: string | null
          playtester: number
          score: number | null
          timestamp: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          note?: string | null
          playtester: number
          score?: number | null
          timestamp?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          note?: string | null
          playtester?: number
          score?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incident_playtester_fkey"
            columns: ["playtester"]
            isOneToOne: false
            referencedRelation: "playtester"
            referencedColumns: ["id"]
          },
        ]
      }
      playtester: {
        Row: {
          avatar: string | null
          created_at: string
          description: string | null
          email: string | null
          id: number
          name: string | null
          notes: string | null
          signup_at: string
          tags: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          name?: string | null
          notes?: string | null
          signup_at?: string
          tags?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          name?: string | null
          notes?: string | null
          signup_at?: string
          tags?: string | null
        }
        Relationships: []
      }
      social_profile: {
        Row: {
          created_at: string
          display_name: string | null
          id: number
          platform: string
          playtester: number | null
          social_id: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: number
          platform: string
          playtester?: number | null
          social_id?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: number
          platform?: string
          playtester?: number | null
          social_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_profile_playtester_fkey"
            columns: ["playtester"]
            isOneToOne: false
            referencedRelation: "playtester"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
