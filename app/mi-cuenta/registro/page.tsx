'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/auth-store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const register = useAuthStore((state) => state.register);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/mi-cuenta');
        }
    }, [isAuthenticated, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);

        const result = await register({
            email: formData.email,
            password: formData.password,
            nombre: formData.nombre,
            apellido: formData.apellido,
            telefono: formData.telefono || undefined,
        });

        if (result.success) {
            router.push('/mi-cuenta');
        } else {
            setError(result.error || 'Error al crear la cuenta');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-gray-100/50">
                    <div className="text-center">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo-cialo.png"
                                alt="CIALO"
                                width={208}
                                height={48}
                                style={{ height: "3rem", width: "auto" }}
                                className="h-12 w-auto"
                                priority
                            />
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-900">Crear cuenta nueva</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Regístrate para hacer seguimiento de tus compras
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input type="text" name="nombre" id="nombre" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-cialo-gold focus:border-cialo-gold"
                                        value={formData.nombre} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                                    <input type="text" name="apellido" id="apellido" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-cialo-gold focus:border-cialo-gold"
                                        value={formData.apellido} onChange={handleChange} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                                <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-cialo-gold focus:border-cialo-gold"
                                    value={formData.email} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                                <input type="tel" name="telefono" id="telefono" className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-cialo-gold focus:border-cialo-gold"
                                    value={formData.telefono} onChange={handleChange} placeholder="+56 9..." />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <input type="password" name="password" id="password" required minLength={6} className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-cialo-gold focus:border-cialo-gold"
                                    value={formData.password} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-cialo-gold focus:border-cialo-gold"
                                    value={formData.confirmPassword} onChange={handleChange} />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-cialo-gold hover:bg-cialo-dark transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-0.5'}`}
                            >
                                {loading ? 'Creando cuenta...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/mi-cuenta/login" className="font-bold text-cialo-gold hover:text-cialo-dark transition-colors">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
