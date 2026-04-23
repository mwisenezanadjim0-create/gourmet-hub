<<<<<<< HEAD
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
=======
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
<<<<<<< HEAD
    PostgrestVersion: "14.5"
  }
=======
    PostgrestVersion: "14.5";
  };
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
  public: {
    Tables: {
      menu_items: {
        Row: {
<<<<<<< HEAD
          available: boolean
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          name: string
          price: number
          slug: string | null
          sort_order: number
        }
        Insert: {
          available?: boolean
          category: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name: string
          price: number
          slug?: string | null
          sort_order?: number
        }
        Update: {
          available?: boolean
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          slug?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          id: string
          items: Json
          notes: string | null
          order_number: string
          paid: boolean
          status: Database["public"]["Enums"]["order_status"]
          stripe_session_id: string | null
          subtotal: number
          total: number
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          id?: string
          items: Json
          notes?: string | null
          order_number?: string
          paid?: boolean
          status?: Database["public"]["Enums"]["order_status"]
          stripe_session_id?: string | null
          subtotal: number
          total: number
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          items?: Json
          notes?: string | null
          order_number?: string
          paid?: boolean
          status?: Database["public"]["Enums"]["order_status"]
          stripe_session_id?: string | null
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff"
      order_status: "new" | "preparing" | "ready" | "delivered" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]
=======
          available: boolean;
          category: string;
          created_at: string;
          description: string;
          id: string;
          image_url: string | null;
          name: string;
          price: number;
          slug: string | null;
          sort_order: number;
        };
        Insert: {
          available?: boolean;
          category: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          name: string;
          price: number;
          slug?: string | null;
          sort_order?: number;
        };
        Update: {
          available?: boolean;
          category?: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          name?: string;
          price?: number;
          slug?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          address: string;
          created_at: string;
          customer_email: string | null;
          customer_name: string;
          customer_phone: string;
          id: string;
          items: Json;
          notes: string | null;
          order_number: string;
          paid: boolean;
          status: Database["public"]["Enums"]["order_status"];
          stripe_session_id: string | null;
          subtotal: number;
          total: number;
          updated_at: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          customer_email?: string | null;
          customer_name: string;
          customer_phone: string;
          id?: string;
          items: Json;
          notes?: string | null;
          order_number?: string;
          paid?: boolean;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_session_id?: string | null;
          subtotal: number;
          total: number;
          updated_at?: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          customer_email?: string | null;
          customer_name?: string;
          customer_phone?: string;
          id?: string;
          items?: Json;
          notes?: string | null;
          order_number?: string;
          paid?: boolean;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_session_id?: string | null;
          subtotal?: number;
          total?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "staff";
      order_status: "new" | "preparing" | "ready" | "delivered" | "cancelled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof DatabaseWithoutInternals
=======
    schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
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
=======
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof DatabaseWithoutInternals
=======
    schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
=======
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
<<<<<<< HEAD
        Insert: infer I
      }
      ? I
      : never
    : never
=======
        Insert: infer I;
      }
      ? I
      : never
    : never;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof DatabaseWithoutInternals
=======
    schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
<<<<<<< HEAD
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
=======
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
<<<<<<< HEAD
        Update: infer U
      }
      ? U
      : never
    : never
=======
        Update: infer U;
      }
      ? U
      : never
    : never;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof DatabaseWithoutInternals
=======
    schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
<<<<<<< HEAD
  schema: keyof DatabaseWithoutInternals
=======
  schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
<<<<<<< HEAD
    : never
=======
    : never;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
<<<<<<< HEAD
    schema: keyof DatabaseWithoutInternals
=======
    schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
<<<<<<< HEAD
  schema: keyof DatabaseWithoutInternals
=======
  schema: keyof DatabaseWithoutInternals;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
<<<<<<< HEAD
    : never
=======
    : never;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      order_status: ["new", "preparing", "ready", "delivered", "cancelled"],
    },
  },
<<<<<<< HEAD
} as const
=======
} as const;
>>>>>>> b1ae631b26e9060913de4a5e15f1688b671f4cbf
