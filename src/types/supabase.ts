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
      feedback: {
        Row: {
          created_at: string
          id: number
          platform: string | null
          playtester: number
          text: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          platform?: string | null
          playtester: number
          text?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          platform?: string | null
          playtester?: number
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_playtester_fkey"
            columns: ["playtester"]
            isOneToOne: false
            referencedRelation: "playtester"
            referencedColumns: ["id"]
          },
        ]
      }
      game_key: {
        Row: {
          claimed: boolean | null
          created_at: string
          id: number
          playtester: number | null
          url: string | null
        }
        Insert: {
          claimed?: boolean | null
          created_at?: string
          id?: number
          playtester?: number | null
          url?: string | null
        }
        Update: {
          claimed?: boolean | null
          created_at?: string
          id?: number
          playtester?: number | null
          url?: string | null
        }
        Relationships: [
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
          key_sent: string | null
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
          key_sent?: string | null
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
          key_sent?: string | null
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
          id: number
          platform: string
          playtester: number | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          platform: string
          playtester?: number | null
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          platform?: string
          playtester?: number | null
          username?: string
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
