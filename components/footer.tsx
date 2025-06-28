import Link from "next/link"
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CarRental</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Sua melhor opção em aluguel de carros. Veículos novos, preços justos e atendimento de qualidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/frota" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Nossa Frota
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Suporte
                </Link>
              </li>
              <li>
                <Link href="/politica" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/cancelamento" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Cancelamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">(11) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">contato@carrental.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-1" />
                <span className="text-gray-300">
                  Rua das Flores, 123
                  <br />
                  Centro - São Paulo/SP
                </span>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 CarRental. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
