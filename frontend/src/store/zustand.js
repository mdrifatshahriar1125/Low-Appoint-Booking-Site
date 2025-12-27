import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  appointments: [],
  loading: false,
  error: null,

  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment]
    })),
  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter(apt => apt.id !== id)
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));

export const useLawyerStore = create((set) => ({
  lawyers: [],
  filteredLawyers: [],
  loading: false,

  setLawyers: (lawyers) => set({ lawyers, filteredLawyers: lawyers }),
  setFilteredLawyers: (filteredLawyers) => set({ filteredLawyers }),
  setLoading: (loading) => set({ loading })
}));

export const useNotificationStore = create((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id: Date.now() }]
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
}));

export const usePaymentStore = create((set) => ({
  paymentStatus: null,
  loading: false,

  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setLoading: (loading) => set({ loading })
}));
