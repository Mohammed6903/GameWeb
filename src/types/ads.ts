export interface AdSettings {
    id?: number;
    google_client_id: string;
    carousel_ad_frequency: number;
    carousel_ad_slot: string;
    carousel_ad_format: string;
    carousel_ad_full_width: boolean;
    sidebar_ad_slot: string;
    sidebar_ad_format: string;
    sidebar_ad_full_width: boolean;
    game_view_ad_slot: string;
    game_view_ad_format: string;
    game_view_ad_full_width: boolean;
    comment_section_ad_slot: string;
    comment_section_ad_format: string;
    comment_section_ad_full_width: boolean;
    show_carousel_ads: boolean;
    show_sidebar_ads: boolean;
    show_game_view_ads: boolean;
    show_comment_section_ads: boolean;
    sidebar_ad_count: number;
}