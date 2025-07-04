import Link from "next/link"
import { Car, Phone, User } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Celsinho</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
              Início
            </Link>
            <Link href="/frota" className="text-gray-600 hover:text-orange-600 transition-colors">
              Nossa Frota
            </Link>
            <Link href="/sobre" className="text-gray-600 hover:text-orange-600 transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-orange-600 transition-colors">
              Contato
            </Link>
          </nav>

          {/* Contact & Login */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(11) 1234-5678</span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Minha Conta</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
