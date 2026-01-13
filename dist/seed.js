"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connectErr_1, admin, workspace, niches, _i, niches_1, n, niche, startDate, endDate, plan;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, prisma.$connect()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    connectErr_1 = _a.sent();
                    console.error('Database unreachable, skipping TypeScript seed. Error:', connectErr_1.message);
                    return [4 /*yield*/, prisma.$disconnect()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, prisma.user.upsert({
                        where: { email: 'admin@opsvantagedigital.online' },
                        update: { name: 'Admin' },
                        create: {
                            email: 'admin@opsvantagedigital.online',
                            name: 'Admin',
                            role: 'admin',
                        },
                    })];
                case 5:
                    admin = _a.sent();
                    return [4 /*yield*/, prisma.workspace.upsert({
                            where: { slug: 'opsvantage' },
                            update: { ownerId: admin.id },
                            create: {
                                name: 'OpsVantage',
                                slug: 'opsvantage',
                                ownerId: admin.id,
                            },
                        })];
                case 6:
                    workspace = _a.sent();
                    // Membership: upsert via composite unique
                    return [4 /*yield*/, prisma.userWorkspaceMembership.upsert({
                            where: { userId_workspaceId: { userId: admin.id, workspaceId: workspace.id } },
                            update: { role: 'owner' },
                            create: { userId: admin.id, workspaceId: workspace.id, role: 'owner' },
                        })];
                case 7:
                    // Membership: upsert via composite unique
                    _a.sent();
                    niches = [
                        { name: 'Psychology of Everyday Behavior', description: 'Behavioral psychology insights.' },
                        { name: 'Productivity Systems', description: 'Systems for productivity and focus.' },
                        { name: 'AI for Humans', description: 'AI tools and tips for everyday people.' },
                    ];
                    _i = 0, niches_1 = niches;
                    _a.label = 8;
                case 8:
                    if (!(_i < niches_1.length)) return [3 /*break*/, 11];
                    n = niches_1[_i];
                    return [4 /*yield*/, prisma.niche.upsert({
                            where: { workspaceId_name: { workspaceId: workspace.id, name: n.name } },
                            update: { description: n.description },
                            create: { workspaceId: workspace.id, name: n.name, description: n.description },
                        })];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11: return [4 /*yield*/, prisma.niche.findUnique({ where: { workspaceId_name: { workspaceId: workspace.id, name: 'Psychology of Everyday Behavior' } } })];
                case 12:
                    niche = _a.sent();
                    if (!niche) return [3 /*break*/, 14];
                    startDate = new Date();
                    endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    return [4 /*yield*/, prisma.contentPlan.create({
                            data: {
                                workspaceId: workspace.id,
                                nicheId: niche.id,
                                timeframe: client_1.Timeframe.monthly,
                                startDate: startDate,
                                endDate: endDate,
                                shortVideos: {
                                    create: Array.from({ length: 30 }, function (_, i) { return ({
                                        workspaceId: workspace.id,
                                        nicheId: niche.id,
                                        dayIndex: i + 1,
                                        hook: "Psychology Hook #".concat(i + 1),
                                        title: '',
                                        script: '',
                                        hashtags: '',
                                        status: client_1.ShortVideoStatus.idea,
                                    }); }),
                                },
                            },
                            include: { shortVideos: true },
                        })];
                case 13:
                    plan = _a.sent();
                    console.log('Seeded 30-day content plan:', plan.id, 'with', plan.shortVideos.length, 'shorts');
                    return [3 /*break*/, 15];
                case 14:
                    console.warn('Niche not found for seeding content plan');
                    _a.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { console.log('Seeding complete'); })
    .catch(function (e) { console.error('Seeding failed:', e); process.exit(1); })
    .finally(function () { return prisma.$disconnect(); });
