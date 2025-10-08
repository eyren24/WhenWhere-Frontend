export type DashboardStat = {
    id: string;
    title: string;
    value: string | number;
    trend?: number;
    icon?: React.ReactNode;
};

export type NavItem = {
    id: string;
    label: string;
    path: string;
    icon?: React.ReactNode;
};