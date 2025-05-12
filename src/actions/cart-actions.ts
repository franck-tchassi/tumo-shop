import { prisma } from "@/db/prisma";
import { getCurrentSession } from "./auth"



const createCart = async () => {

    const {user} = await getCurrentSession();

    const cart = await prisma.cart.create({
        data:{
            id: crypto.randomUUID(),
            user: user ? { connect: {id: user.id}}: undefined,
            items: {
                create: [],
            }
        },
        include:{
            items: true
        }
    })
}